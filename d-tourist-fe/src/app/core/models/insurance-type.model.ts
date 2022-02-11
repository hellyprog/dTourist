export class InsuranceType {
    name: string;
    dailyPrice: number;
    description: string;

    constructor(name: string, dailyPrice: number, description: string) {
        this.name = name;
        this.dailyPrice = dailyPrice;
        this.description = description;
    }
}