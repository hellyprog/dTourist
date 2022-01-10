export class PositionResponse {
    data!: Position[];
    error!: ErrorResponse
}

export class Position {
    latitude!: number;
    longitude!: number;
    region!: string;
    country!: string;
}

export class ErrorResponse {
    message!: string;
}