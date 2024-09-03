import { Route } from "../models/route";
import { Bus } from "../models/bus";

export interface AddBusToRouteDTO {
    selectedBuses : Bus[]
    selectedRoute : Route
    scaleDepartureTime : boolean
    extendClosingTime : boolean
}