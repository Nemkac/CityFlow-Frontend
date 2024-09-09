import { Bus } from "../models/bus";
import { Route } from "../models/route";

export interface AddRoutesToBusDTO{
    bus : Bus
    routes : Route[]
    scaleDepartureTime : boolean
    extendClosingTime : boolean
}