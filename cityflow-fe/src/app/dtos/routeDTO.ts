import { Location } from "../models/location";
import { RouteType } from "../models/routeType";

export interface RouteDTO{
    routeName: string;
    startingPoint: Location;
    endingPoint: Location;
    stations: Location[];
    openingTime: string;
    closingTime: string;
    type : RouteType;
}