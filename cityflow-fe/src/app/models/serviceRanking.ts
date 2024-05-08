import { Bus } from "./bus";

export interface ServiceRanking{
    id:number;
    bus:Bus;
    score:number;
    rank:number;
    fixedAfter:Bus
}