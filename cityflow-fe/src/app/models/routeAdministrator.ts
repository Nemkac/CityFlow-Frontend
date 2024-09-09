import { User } from "./user";
import { Widget } from "./widget";

export interface RouteAdministrator{
    routeAdminId : number,
    user : User,
    widgets : Widget[]
}