import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', 
})
export class GlobalService {
  public globalServicer: number = 0;
  public globalDriver : number = 0;
  public globalCharger : number = 0;

  constructor() { }

  getGlobalServicer(): number {
    return this.globalServicer;
  }

  setGlobalServicer(value: number): void {
    this.globalServicer = value;
  }

  getGlobalDriver(): number {
    return this.globalDriver;
  }

  setGlobalDriver(value: number): void {
    this.globalDriver = value;
  }

  getGlobalCharger(): number {
    return this.globalCharger;
  }

  setGlobalCharger(value: number): void {
    this.globalCharger = value;
  }
}
