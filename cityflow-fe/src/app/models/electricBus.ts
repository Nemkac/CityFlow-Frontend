import { Bus } from "./bus";

export interface ElectricBus {
    elBusId : number,
    batteryHealth : number,
    batteryCapacity : number,
    energyConsumption :number,
    routeLength : number,
    batteryLevel : number,
    bus : Bus
}