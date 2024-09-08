import { Bus } from "./bus";
import { RouteType } from "./routeType";

export interface Route{
    id: number;
    name: string;
    startingPoint: Location;
    stations: Location[];
    buses : Bus[];
    endPoint: Location;
    openingTime: string;
    closingTime: string;
    departureFromStartingStation : number;
    type : RouteType
}