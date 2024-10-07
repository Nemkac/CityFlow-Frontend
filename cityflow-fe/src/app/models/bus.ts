import { Route } from "./route";

export interface Bus {
    id: number,
    chassisNumber : string,
    currentMileage : number,
    manufactureDate : string,
    seatingCapacity : number,
    licencePlate: string,
    routes: Route[],
    routeNames: string[],
}