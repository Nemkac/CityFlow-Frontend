import { ChargingStation } from "./chargingStaiton"
import { ElectricBus } from "./electricBus"

export interface GeneticAlgorithmOutput{
    genOutId : number,
    elBus : ElectricBus,
    chStation : ChargingStation,
    chargingTime : number,
    startTime : Date,
    endTime : Date
}