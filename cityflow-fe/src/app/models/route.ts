export interface Route{
    id: number;
    name: string;
    startingPoint: Location;
    stations: Location[];
    endPoint: Location;
    openingTime: string;
    closingTime: string;
}