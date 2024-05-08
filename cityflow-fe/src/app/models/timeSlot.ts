

export interface TimeSlot {
    start:Date,
    duration:number
}

export class TimeSlotImpl implements TimeSlot {
    constructor(public start: Date, public duration: number) {}
}