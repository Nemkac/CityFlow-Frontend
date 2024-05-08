import { Bus } from "./bus";
import { Driver } from "./driver";

export interface MalfunctionReport{
    busMalfunctionReportId:number,
    driver:Driver,
    bus:Bus,
    summary:string,
    ifProcessed:boolean,
    date:Date
}
