import { Bus } from "./bus";
import { User } from "./user";

export interface Driver {
    driverId:number,
    user:User,
    bus:Bus
    }