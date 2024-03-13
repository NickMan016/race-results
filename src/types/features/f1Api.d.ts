export interface F1APIBaseResponse {
    MRData: MRDataBaseResponse
}

export interface MRDataBaseResponse {
    xmlns: string
    series: string
    url: string
    limit: string
    offset: string
    total: string
    // RaceTable: RaceTable
    // StandingsTable: StandingsTable
    // ConstructorTable: ConstructorTable,
    // DriverTable: DriverTable,
    // CircuitTable: CircuitTable,
}

export interface GetRaceProps {
    season: string
    race: string
}

export interface GetDriverProps {
    season: string
    constructor?: string
}

export interface GetDriverResultsProps {
    season: string
    driverId: string
}

export interface GetConstructorResultsProps {
    season: string
    constructorId: string
}