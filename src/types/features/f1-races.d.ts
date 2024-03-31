import { F1APIBaseResponse, MRDataBaseResponse } from "./f1Api";

export interface SeasonTable {
  season: string;
  Seasons: Season[];
}

export interface RaceTable {
  season: string;
  round: string;
  Races: Race[];
}

export interface DriverTable {
  season: string;
  Drivers: Driver[];
}

export interface ConstructorTable {
  season: string;
  Constructors: Constructor[];
}

export interface StandingsTable {
  season: string;
  StandingsLists: StandingsList[];
}

export interface StandingsList {
  season: string;
  round: string;
}

export interface DriverStandingsList extends StandingsList {
  DriverStandings: DriverStanding[];
}

export interface ConstructorStandingsList extends StandingsList {
  ConstructorStandings: ConstructorStanding[];
}

export interface DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  poles: string;
  fastestlaps: string;
  Driver: Driver;
  Constructors: Constructor[];
}

export interface ConstructorStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: Constructor;
}

export interface Season {
  season: string;
  url: string
}

export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  QualifyingResults?: QualifyingResult[];
  SprintResults?: Result[];
  FirstPractice?: Schedule;
  SecondPractice?: Schedule;
  ThirdPractice?: Schedule;
  Qualifying?: Schedule;
  Sprint?: Schedule;
}

export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: Location;
}

export interface Location {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

export interface Schedule {
  date: string;
  time: string;
}

export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface Result {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time: Time;
  FastestLap: FastestLap;
}

export interface Result {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time: Time;
  FastestLap: FastestLap;
}

export interface Qualifying {
  number: string;
  position: string;
  Driver: Driver;
  Constructor: Constructor;
  Q1: string
  Q2?: string
  Q3?: string
}

export interface Time {
  millis: string;
  time: string;
}

export interface FastestLap {
  rank: string;
  lap: string;
  Time: Time;
  AverageSpeed: AverageSpeed
}

export interface AverageSpeed {
  units: string;
  speed: string;
}

export interface Schedule {
  date: string;
  time: string;
}

export interface RaceResults extends Race {
  Results: Result[];
}

export interface QualifyingResults extends Race {
  QualifyingResults: Qualifying[];
}

export interface SeasonsApiResponse extends MRDataBaseResponse {
  SeasonTable: SeasonTable;
}

export interface RacesApiResponse extends MRDataBaseResponse {
  RaceTable: RaceTable;
}

export interface QualifyingApiResponse extends MRDataBaseResponse {
  RaceTable: RaceTable;
}

export interface StandingsApiResponse extends MRDataBaseResponse {
  StandingsTable: StandingsTable;
}

export interface DriversApiResponse extends MRDataBaseResponse {
  DriverTable: DriverTable;
}

export interface ConstructorsApiResponse extends MRDataBaseResponse {
  ConstructorTable: ConstructorTable;
}
