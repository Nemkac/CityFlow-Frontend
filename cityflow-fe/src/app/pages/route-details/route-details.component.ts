import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Route } from '../../models/route';
import { RoutesService } from '../../service/routes.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRoute, faPen, faTrash, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import * as L from 'leaflet';
import { Routing } from 'leaflet';
import { Bus } from '../../models/bus';
import { BusesListItemComponent } from '../../components/buses-list-item/buses-list-item.component';
import { User } from '../../models/user';
import { AuthService } from '../../service/auth.service';

import * as SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs'
import { LiveLocation } from '../../models/liveLocation';
import { RabbitmqLiveLocationService } from '../../service/rabbitmq-live-location.service';

import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBusToRouteComponent } from '../../components/modals/add-bus-to-route/add-bus-to-route.component';

@Component({
  selector: 'app-route-details',
  standalone: true,
  imports: [FontAwesomeModule, BusesListItemComponent, CommonModule],
  templateUrl: './route-details.component.html',
  styleUrl: './route-details.component.css'
})
export class RouteDetailsComponent implements OnInit, AfterViewInit{
  
  @ViewChild('pdfContent', { static: true }) pdfContent!: ElementRef;
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  routeId : number = 0;
  route!: Route;
  startingPoint!: L.LatLng;
  endingPoint!: L.LatLng;
  stations: L.LatLng[] = []; 
  routeBuses : Bus[] = [];
  times : string[] = [];

  token : string | null = sessionStorage.getItem('token');
  loggedUser! : User;
  loggedUserRole : string  = '';

  map: L.Map | null = null;
  busMarker: L.Marker | null = null;
  routeCoordinates : any;

  public showTimeTable : boolean = true;
  public showBusSchedule : boolean = false;

  public weekendTimeTable : { time: string, isNext: boolean }[] = [];
  public nonWeekendTimeTable : { time: string, isNext: boolean }[] = [];

  constructor(private routeService: RoutesService,
              private routes: ActivatedRoute,
              private authService: AuthService,
              private modalService : NgbModal,
              private rabbitmqLiveLocationService: RabbitmqLiveLocationService){}

  public ngOnInit(): void {
    this.fetchUser();
    const idFromRoute = this.routes.snapshot.paramMap.get('id');
    if(idFromRoute != null){
      this.routeId =+ idFromRoute;
      this.fetchRoute();
    }

    // this.establishWebSocketConnection();
    // this.simulate();
  }

  public ngAfterViewInit(): void {
    this.loadMap();
    this.weekendTimeTable = this.getTimeTable(true);
    this.nonWeekendTimeTable = this.getTimeTable(false);
  }

  public fetchUser() : void {
    if(this.token != null){
      this.authService.getUserFromToken(this.token).subscribe(
        (response : User) => {
          this.loggedUser = response;
          this.loggedUserRole = this.loggedUser.roles;
          console.log(this.loggedUserRole);
        },
        (error: HttpErrorResponse) => {
          console.log('Error fetching user data:\n', error.message);
        }
      )
    }
  }

  public fetchRoute() : void{
    this.routeService.getById(this.routeId).subscribe(
      (response : Route) => {
        this.route = response;
        this.routeBuses = this.route.buses;
        this.fetchStations();

        console.log("ROUTE: \n", this.route);
      },
      (error : HttpErrorResponse) => {
        console.log("Error while fetching route: \n", error.message);
      }
    )
  }

  public fetchStations() : void {
    const startingPoint: any = this.route.startingPoint;
    this.startingPoint = L.latLng(startingPoint.latitude, startingPoint.longitude);

    const endingPoint: any = this.route.endPoint;
    this.endingPoint = L.latLng(endingPoint.latitude, endingPoint.longitude);

    const stations: any[] = this.route.stations;
    this.stations = stations.map(station => L.latLng(station.latitude, station.longitude));

    console.log('Starting station: \n', this.startingPoint);
    console.log('Ending station: \n', this.endingPoint);
    console.log('Stations: \n', this.stations);
  }

  public loadMap() {
    if (!this.mapContainer) return;

    this.map = L.map(this.mapContainer.nativeElement).setView(
      [this.startingPoint.lat, this.startingPoint.lng],
      12
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  
    L.marker([this.startingPoint.lat, this.startingPoint.lng], { icon: this.startingIcon }).addTo(this.map);
  
    this.stations.forEach(station => {
      if (this.map) {
        L.marker([station.lat, station.lng], { icon: this.busIcon }).addTo(this.map);
      }
    });
  
    if (this.map) {
      L.marker([this.endingPoint.lat, this.endingPoint.lng], { icon: this.endingIcon }).addTo(this.map);
    }
  
    const waypoints = [
      L.latLng(this.startingPoint.lat, this.startingPoint.lng),
      ...this.stations.map(station => L.latLng(station.lat, station.lng)),
      L.latLng(this.endingPoint.lat, this.endingPoint.lng)
    ];

    const plan = new L.Routing.Plan(waypoints, {
      createMarker: function() { return false; }
    });

    const routingControl = L.Routing.control({
      plan: plan,
      routeWhileDragging: false
    }).addTo(this.map);

    routingControl.on('routesfound', (e) => {
        const routes = e.routes;
        this.routeCoordinates = [];
        routes[0].coordinates.forEach((coord: { lat: any; lng: any; }) => {
            this.routeCoordinates.push([coord.lat, coord.lng]);
        });
        console.log('Total route coordinates extracted:', this.routeCoordinates.length);
    });
  }

  public establishWebSocketConnection(): void {
    const client = new Stomp.Client({
      webSocketFactory: () => new SockJS.default('http://localhost:8081/livelocation-websocket'),
      connectHeaders: {
          login: 'guest',
          passcode: 'guest',
      },
      debug: (str) => {
          console.log(new Date(), str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    client.onConnect = (frame) => {
        console.log('Connected to WebSocket');
        client.subscribe('/livelocation-websocket', (message) => {
            console.log("Subscribed to topic");
            const location: LiveLocation = JSON.parse(message.body);
            console.log('New location received:', location);
            this.updateMarkerPosition(location.latitude, location.longitude);
        });
    };

    client.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };

    client.activate();
	}

  private updateMarkerPosition(latitude: number, longitude: number): void {
    if (this.map) {
      if (this.busMarker) {
        this.busMarker.remove();
      }

      this.busMarker = L.marker([latitude, longitude], { icon: this.busMarkerIcon }).addTo(this.map);

      this.map.panTo(new L.LatLng(latitude, longitude));
    }
  }

  public sendCoordinateToRabbitMQ(latitude: number, longitude: number): void{
		const liveLocation : LiveLocation = {
			latitude: latitude,
			longitude: longitude,
		};

		const token = sessionStorage.getItem('token');
		const headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
		});
		this.rabbitmqLiveLocationService.sendLiveLocationMessage(liveLocation,headers).subscribe();
	}

  public simulate(): void {
    let index = 0;
    let forward = true;
  
    const intervalId = setInterval(() => {
      if (index === this.routeCoordinates.length - 1 && forward) {
        forward = false;
      } 
      else if (index === 0 && !forward) {
        forward = true;
      }
  
      const currentCoordinate = this.routeCoordinates[index];
      console.log(currentCoordinate[0], currentCoordinate[1]); 
      this.sendCoordinateToRabbitMQ(currentCoordinate[0], currentCoordinate[1]);
  
      index += forward ? 1 : -1;
    }, 3000);
  }

  public generatePDF() : void {

  }

  public getTimeTable(isWeekend: boolean): { time: string, isNext: boolean }[] {
    const openingTime = this.route.openingTime;
    const closingTime = this.route.closingTime;
    const interval = isWeekend ? this.route.departureFromStartingStation * 2 : this.route.departureFromStartingStation;

    let times: { time: string, isNext: boolean }[] = [];

    if(interval > 0){
      const timeToDate = (time: string, isClosing = false): Date => {
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        if (isClosing && hours < 12) { 
            date.setDate(date.getDate() + 1);
        }
        return date;
      };
  
      const dateToTimeString = (date: Date): string => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      };
  
      const now = new Date();
      const openingDate = timeToDate(openingTime);
      const closingDate = timeToDate(closingTime, true);
  
      let currentTime = new Date(openingDate);
  
      while (currentTime <= closingDate) {
        const timeString = dateToTimeString(currentTime);
        times.push({ time: timeString, isNext: false });
        currentTime.setMinutes(currentTime.getMinutes() + interval);
      }
  
      const isTodayWeekend = this.isTodayWeekend();
      if ((isTodayWeekend && isWeekend) || (!isTodayWeekend && !isWeekend)) {
        const nextDeparture = this.findNextDeparture(times, now);
        if (nextDeparture !== -1) {
          times[nextDeparture].isNext = true;
        }
      }
  
    }
    return times;
  }

  public isTodayWeekend(): boolean {
    const today = new Date().getDay(); 
    return today === 6 || today === 0;  
  }

  public findNextDeparture(times: { time: string, isNext: boolean }[], current: Date): number {
    for (let i = 0; i < times.length; i++) {
      const timeDate = this.timeToDate(times[i].time);
      if (timeDate > current) {
        return i;
      }
    }
    return -1; 
  }

  public addBusToRoute(){
    const modalRef = this.modalService.open(
      AddBusToRouteComponent,
      { backdrop : 'static', keyboard : true }
    );

    modalRef.componentInstance.selectedRoute = this.route;
    modalRef.componentInstance.busesAdded.subscribe(
      () => {
        this.fetchRoute();
        window.location.reload();
      }
    )
  
  }

  public timeToDate(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  private startingIcon = L.icon({
    iconUrl: 'assets/flag.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  private endingIcon = L.icon({
    iconUrl: 'assets/pin.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  private busIcon = L.icon({
    iconUrl: 'assets/bus.png',
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  busMarkerIcon = L.icon({
    iconUrl: 'assets/busMarker.png',
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  });

  public handleBusListUpdate() {
    this.fetchRoute();
    window.location.reload()
  }

  public toggleBusSchedule(){
    this.showBusSchedule  = true;
    this.showTimeTable = false;
  }

  public toggleTimeTable(){
    this.showBusSchedule  = false;
    this.showTimeTable = true;
  }
}
