export class AppConfig {
    contract!: ContractsConfiguration;
    locationApi!: LocationApiConfiguration;
    scanner!: ScannerConfiguration;
}

export class ContractsConfiguration {
    customsContractAddress!: string;
    insuranceStoreContractAddress!: string;
    wsProvider!: string;
}

export class LocationApiConfiguration {
    locationIqApi!: string;
    locationIqKey!: string;
}

export class ScannerConfiguration {
    url!: string;
    windowName!: string;
    windowWidth!: string;
    windowHeight!: string;
}