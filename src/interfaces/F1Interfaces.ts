// 

export interface MRData {
    xmlns: string
    series: string
    url: string
    limit: string
    offset: string
    total: string
    RaceTable?: RaceTable
    StandingsTable?: StandingsTable
    ConstructorTable?: ConstructorTable,
    DriverTable?: DriverTable,
    CircuitTable?: CircuitTable,
}

export interface Driver {
    driverId: string
    permanentNumber?: string
    code?: string
    url: string
    givenName: string
    familyName: string
    dateOfBirth: string
    nationality: string
}

export interface Constructor {
    constructorId: string
    url: string
    name: string
    nationality: string
}

export interface Circuit {
    circuitId: string
    url: string
    circuitName: string
    Location: Location
}

export interface Season {
    season: string
    url: string
}

export interface Race {
    season: string
    round: string
    url: string
    raceName: string
    Circuit: Circuit
    date: string
    time: string
    Results?: Result[]
    QualifyingResults?: QualifyingResult[]
    FirstPractice: Schedule
    SecondPractice: Schedule
    ThirdPractice?: Schedule
    Qualifying: Schedule
    Sprint?: Schedule
}

export interface Location {
    lat: string
    long: string
    locality: string
    country: string
}

export interface RaceTable {
    season: string
    round: string
    Races: Race[]
}

export interface StandingsTable {
    season: string
    StandingsLists: StandingsList[]
}

export interface QualifyingResult {
    number: string
    position: string
    Driver: Driver
    Constructor: Constructor
    Q1: string
    Q2?: string
    Q3?: string
}

export interface ConstructorTable {
    Constructors: Constructor[]
}

export interface DriverTable {
    season?: string,
    constructorId?: string,
    Drivers: Driver[]
}

export interface CircuitTable {
    season?: string,
    Circuits: Circuit[]
}

export interface Result {
    number: string
    position: string
    positionText: string
    points: string
    Driver: Driver
    Constructor: Constructor
    grid: string
    laps: string
    status: string
    Time: Time
    FastestLap?: FastestLap
}

export interface StandingsList {
    season: string
    round: string
    DriverStandings?: DriverStanding[]
    ConstructorStandings?: ConstructorStanding[]
}

export interface DriverStanding {
    position: string
    positionText: string
    points: string
    wins: string
    Driver: Driver
    Constructors: Constructor[]
}

export interface ConstructorStanding {
    position: string
    positionText: string
    points: string
    wins: string
    Constructor: Constructor
}

export interface Time {
    millis?: string
    time: string
}

export interface FastestLap {
    rank: string
    lap: string
    Time: Time
}

export interface Schedule {
    date: string
    time: string
}
