export class InsuranceType {
    id: number;
    name: string;
    dailyPrice: number;
    description: string;

    constructor(id: number, name: string, dailyPrice: number, description: string) {
        this.id = id;
        this.name = name;
        this.dailyPrice = dailyPrice;
        this.description = description;
    }
}