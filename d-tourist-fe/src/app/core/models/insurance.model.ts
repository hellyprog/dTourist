export class Insurance {
    type: number;
    expiryDate: Date;

    constructor(type: number, expiryInUnixTimestamp: number) {
        this.type = type;
        this.expiryDate = new Date(expiryInUnixTimestamp * 1000);
    }
}