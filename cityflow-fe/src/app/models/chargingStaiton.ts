import { ElectricBus } from "./electricBus";

export interface ChargingStation{
    chargerId : number,
    outPutPower : number,
    numOfPorts: number,
    busesCharging :  ElectricBus[]
}