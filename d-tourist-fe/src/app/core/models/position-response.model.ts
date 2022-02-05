export class PositionResponse {
    lat!: number;
    lon!: number;
    address!: Address;
}

export class Address {
    city!: string;
    country!: string;
}