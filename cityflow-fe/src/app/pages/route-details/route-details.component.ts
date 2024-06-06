import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Route } from '../../models/route';
import { RoutesService } from '../../service/routes.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRoute, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
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

@Component({
  selector: 'app-route-details',
  standalone: true,
  imports: [FontAwesomeModule, BusesListItemComponent],
  templateUrl: './route-details.component.html',
  styleUrl: './route-details.component.css'
})
export class RouteDetailsComponent implements OnInit, AfterViewInit{
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  //Icons
  faPen = faPen;
  faTrash = faTrash;
  faRoute = faRoute;

  routeId : number = 0;
  route!: Route;
  startingPoint!: L.LatLng;
  endingPoint!: L.LatLng;
  stations: L.LatLng[] = []; 
  routeBuses : Bus[] = [];

  token : string | null = localStorage.getItem('token');
  loggedUser! : User;
  loggedUserRole : string  = '';

  busMarker: L.Marker | null = null;
  routeCoordinates : any;

  constructor(private routeService: RoutesService,
              private routes: ActivatedRoute,
              private authService: AuthService,
              private rabbitmqLiveLocationService: RabbitmqLiveLocationService){}

  ngOnInit(): void {
    this.fetchUser();
    const idFromRoute = this.routes.snapshot.paramMap.get('id');
    if(idFromRoute != null){
      this.routeId =+ idFromRoute;
      this.fetchRoute();
    }
    this.establishWebSocketConnection();
    this.simulate();

  }

  public fetchUser() : void {
    if(this.token != null){
      this.authService.getUserFromToken(this.token).subscribe(
        (response : User) => {
          this.loggedUser = response;
          this.loggedUserRole = this.loggedUser.roles;
        },
        (error: HttpErrorResponse) => {
          console.log('Error fetching user data:\n', error.message);
        }
      )
    }
  }

  public fetchRoute() : void{
    this.routeService.getRoute(this.routeId).subscribe(
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

  fetchStations() : void {
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

  ngAfterViewInit(): void {
    this.loadMap();
  }

  loadMap() {
    const map = L.map(this.mapContainer.nativeElement).setView(
      [this.startingPoint.lat, this.startingPoint.lng],
      12
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    L.marker([this.startingPoint.lat, this.startingPoint.lng], { icon: this.startingIcon }).addTo(map);

    this.stations.forEach(station => {
      L.marker([station.lat, station.lng], { icon: this.busIcon }).addTo(map);
    });

    L.marker([this.endingPoint.lat, this.endingPoint.lng], { icon: this.endingIcon }).addTo(map);
  
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
    }).addTo(map);

    routingControl.on('routesfound', (e) => {
        const routes = e.routes;
        this.routeCoordinates = [];
        routes[0].coordinates.forEach((coord: { lat: any; lng: any; }) => {
            this.routeCoordinates.push([coord.lat, coord.lng]);
        });
        console.log('Total route coordinates extracted:', this.routeCoordinates.length);
    });
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
    if (this.busMarker) {
        this.busMarker.remove();
    }

    // this.busMarker = L.marker([latitude, longitude], { icon: this.busMarkerIcon }).addTo(this.map);

    // this.map.panTo(new L.LatLng(latitude, longitude));
}

  sendCoordinateToRabbitMQ(latitude: number, longitude: number): void{
		const liveLocation : LiveLocation = {
			latitude: latitude,
			longitude: longitude,
		};

		const token = localStorage.getItem('token');
		const headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
		});
		this.rabbitmqLiveLocationService.sendLiveLocationMessage(liveLocation,headers).subscribe();
	}

  simulate() : void{
		let index = 0;
    const intervalId = setInterval(() => {
      if (index < this.routeCoordinates.length) {
        const currentCoordinate = this.routeCoordinates[index];
        console.log(currentCoordinate);
        this.sendCoordinateToRabbitMQ(currentCoordinate[0], currentCoordinate[1]);
        index++;
      }
		}, 3000);
  }
}
