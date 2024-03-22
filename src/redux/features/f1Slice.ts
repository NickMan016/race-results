import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { f1Api } from "../services";
import { RootState } from "../store";
import {
  F1APIBaseResponse,
  RacesApiResponse,
  Race,
  StandingsApiResponse,
  DriverStanding,
  ConstructorStanding,
  DriverStandingsList,
  ConstructorStandingsList,
  RaceResults,
  DriversApiResponse,
  Driver,
  SeasonsApiResponse,
  ConstructorsApiResponse,
  Constructor,
  Season,
  StandingsList,
  QualifyingApiResponse,
  QualifyingResults,
} from "../../types";

export interface racesState {
  activePage: string;
  currentSeason: string;
  races: Race[];
  race: Race;
  driverStanding: DriverStanding[];
  constructorStanding: ConstructorStanding[];
  drivers: Driver[];
  constructors: Constructor[];
  driverSelected: Driver | undefined;
  constructorSelected: Constructor | undefined;
  raceSelected: Race | undefined;
  resultsRace: RaceResults;
  qualifyingRace: QualifyingResults;
  driverSeasons: Season[];
  driverResults: RaceResults[];
  driverChampionships: StandingsList[];
  constructorSeasons: Season[];
  constructorResults: RaceResults[];
  loadRaces: boolean;
  loadRace: boolean;
  loadDriverStanding: boolean;
  loadConstructorStanding: boolean;
  loadDrivers: boolean;
  loadConstructors: boolean;
  loadResults: boolean;
  loadQualifying: boolean;
  loadDriverSeasons: boolean;
  loadDriverResults: boolean;
  loadDriverChampionships: boolean;
  loadConstructorSeasons: boolean;
  loadConstructorResults: boolean;
}

const initialState: racesState = {
  activePage: "home",
  currentSeason: "",
  races: [],
  race: {
    season: "",
    round: "",
    url: "",
    raceName: "",
    Circuit: {
      circuitId: "",
      url: "",
      circuitName: "",
      Location: {
        lat: "",
        long: "",
        locality: "",
        country: "",
      },
    },
    date: "",
    time: "",
    QualifyingResults: [],
    SprintResults: [],
  },
  driverStanding: [],
  constructorStanding: [],
  drivers: [],
  constructors: [],
  resultsRace: {
    season: "",
    round: "",
    url: "",
    raceName: "",
    Circuit: {
      circuitId: "",
      url: "",
      circuitName: "",
      Location: {
        lat: "",
        long: "",
        locality: "",
        country: "",
      },
    },
    date: "",
    time: "",
    Results: [],
  },
  qualifyingRace: {
    QualifyingResults: [],
    season: "",
    round: "",
    url: "",
    raceName: "",
    Circuit: {
      circuitId: "",
      url: "",
      circuitName: "",
      Location: {
        lat: "",
        long: "",
        locality: "",
        country: "",
      },
    },
    date: "",
    time: ""
  },
  driverSeasons: [],
  driverResults: [],
  driverChampionships: [],
  constructorSeasons: [],
  constructorResults: [],
  loadRaces: false,
  loadRace: false,
  loadDriverStanding: false,
  loadConstructorStanding: false,
  loadResults: false,
  loadQualifying: false,
  loadDrivers: false,
  loadConstructors: false,
  loadDriverSeasons: false,
  loadDriverResults: false,
  loadDriverChampionships: false,
  loadConstructorSeasons: false,
  loadConstructorResults: false,
  driverSelected: undefined,
  constructorSelected: undefined,
  raceSelected: undefined,
};

export const f1Slice = createSlice({
  name: "f1",
  initialState,
  reducers: {
    changeActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    changeDriverSelected: (state, action: PayloadAction<Driver>) => {
      state.activePage = "driver";
      state.driverSelected = action.payload;
    },
    clearDriverSelected: (state, _) => {
      state.driverSelected = undefined;
    },
    changeConstructorSelected: (state, action: PayloadAction<Constructor>) => {
      state.activePage = "team";
      state.constructorSelected = action.payload;
    },
    clearConstructorSelected: (state, _) => {
      state.constructorSelected = undefined;
    },
    changeRaceSelected: (state, action: PayloadAction<Race>) => {
      state.activePage = "race";
      state.raceSelected = action.payload;
    },
    clearRaceSelected: (state, _) => {
      state.raceSelected = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        f1Api.endpoints.getCurrentSeason.matchFulfilled,
        (state, action: PayloadAction<F1APIBaseResponse>) => {
          const data = action.payload.MRData as SeasonsApiResponse;

          state.currentSeason = data.SeasonTable.season;
        }
      )
      .addMatcher(f1Api.endpoints.getRaces.matchPending, (state, _) => {
        state.loadRaces = false;
      })
      .addMatcher(
        f1Api.endpoints.getRaces.matchFulfilled,
        (state, action: PayloadAction<F1APIBaseResponse>) => {
          const data = action.payload.MRData as RacesApiResponse;

          state.loadRaces = true;
          state.races = data.RaceTable.Races;
        }
      )
      .addMatcher(f1Api.endpoints.getRace.matchPending, (state, _) => {
        state.loadRace = false;
      })
      .addMatcher(
        f1Api.endpoints.getRace.matchFulfilled,
        (state, action: PayloadAction<F1APIBaseResponse>) => {
          const data = action.payload.MRData as RacesApiResponse;
          state.loadRace = true;
          state.race = data.RaceTable.Races[0];
        }
      )
      .addMatcher(
        f1Api.endpoints.getDriverStandings.matchPending,
        (state, _) => {
          state.loadDriverStanding = false;
        }
      )
      .addMatcher(
        f1Api.endpoints.getDriverStandings.matchFulfilled,
        (state, action: PayloadAction<F1APIBaseResponse>) => {
          const data = action.payload.MRData as StandingsApiResponse;
          const standing = data.StandingsTable
            .StandingsLists[0] as DriverStandingsList;
          state.loadDriverStanding = true;
          state.driverStanding = standing.DriverStandings;
        }
      )
      .addMatcher(
        f1Api.endpoints.getConstructorStandings.matchPending,
        (state, _) => {
          state.loadConstructorStanding = false;
        }
      )
      .addMatcher(
        f1Api.endpoints.getConstructorStandings.matchFulfilled,
        (state, action: PayloadAction<F1APIBaseResponse>) => {
          const data = action.payload.MRData as StandingsApiResponse;
          const standing = data.StandingsTable
            .StandingsLists[0] as ConstructorStandingsList;
          state.loadConstructorStanding = true;
          state.constructorStanding = standing.ConstructorStandings;
        }
      )
      .addMatcher(f1Api.endpoints.getResults.matchPending, (state, _) => {
        state.loadResults = false;
      })
      .addMatcher(
        f1Api.endpoints.getResults.matchFulfilled,
        (state, action: PayloadAction<F1APIBaseResponse>) => {
          const data = action.payload.MRData as RacesApiResponse;
          const results = data.RaceTable.Races[0] as RaceResults;
          state.loadResults = true;
          state.resultsRace = results;
        }
      )
      .addMatcher(f1Api.endpoints.getResultsQualifying.matchPending, (state, _) => {
        state.loadQualifying = false;
      })
      .addMatcher(
        f1Api.endpoints.getResultsQualifying.matchFulfilled,
        (state, action: PayloadAction<F1APIBaseResponse>) => {
          const data = action.payload.MRData as QualifyingApiResponse;
          const qualifyingResults = data.RaceTable.Races[0] as QualifyingResults;
          state.loadQualifying = true;
          state.qualifyingRace = qualifyingResults;
        }
      )
      .addMatcher(f1Api.endpoints.getDrivers.matchPending, (state, _) => {
        state.loadDrivers = false;
      })
      .addMatcher(
        f1Api.endpoints.getDrivers.matchFulfilled,
        (state, action: PayloadAction<F1APIBaseResponse>) => {
          const data = action.payload.MRData as DriversApiResponse;
          const results = data.DriverTable.Drivers;
          state.loadDrivers = true;
          state.drivers = results;
        }
      )
      .addMatcher(f1Api.endpoints.getConstructors.matchPending, (state, _) => {
        state.loadConstructors = false;
      })
      .addMatcher(
        f1Api.endpoints.getConstructors.matchFulfilled,
        (state, action: PayloadAction<F1APIBaseResponse>) => {
          const data = action.payload.MRData as ConstructorsApiResponse;
          const results = data.ConstructorTable.Constructors;
          state.loadConstructors = true;
          state.constructors = results;
        }
      )
      .addMatcher(f1Api.endpoints.getDriverSeasons.matchPending, (state, _) => {
        state.loadDriverSeasons = false;
      })
      .addMatcher(
        f1Api.endpoints.getDriverSeasons.matchFulfilled,
        (state, action: PayloadAction<F1APIBaseResponse>) => {
          const data = action.payload.MRData as SeasonsApiResponse;
          const results = data.SeasonTable.Seasons;
          state.loadDriverSeasons = true;
          state.driverSeasons = results.sort(
            (a, b) => parseInt(b.season) - parseInt(a.season)
          );
        }
      )
      .addMatcher(f1Api.endpoints.getDriverResults.matchPending, (state, _) => {
        state.loadDriverResults = false;
      })
      .addMatcher(
        f1Api.endpoints.getDriverResults.matchFulfilled,
        (state, action: PayloadAction<F1APIBaseResponse>) => {
          const data = action.payload.MRData as RacesApiResponse;
          const results = data.RaceTable.Races as RaceResults[];
          state.driverResults = results;
          state.loadDriverResults = true;
        }
      )
      .addMatcher(
        f1Api.endpoints.getDriverChampionships.matchPending,
        (state, _) => {
          state.loadDriverChampionships = false;
        }
      )
      .addMatcher(
        f1Api.endpoints.getDriverChampionships.matchFulfilled,
        (state, action: PayloadAction<F1APIBaseResponse>) => {
          const data = action.payload.MRData as StandingsApiResponse;
          state.driverChampionships = data.StandingsTable.StandingsLists;
          state.loadDriverChampionships = true;
        }
      )
      .addMatcher(
        f1Api.endpoints.getConstructorSeasons.matchPending,
        (state, _) => {
          state.loadConstructorSeasons = false;
        }
      )
      .addMatcher(
        f1Api.endpoints.getConstructorSeasons.matchFulfilled,
        (state, action: PayloadAction<F1APIBaseResponse>) => {
          const data = action.payload.MRData as SeasonsApiResponse;
          const results = data.SeasonTable.Seasons;
          state.loadConstructorSeasons = true;
          state.constructorSeasons = results.sort(
            (a, b) => parseInt(b.season) - parseInt(a.season)
          );
        }
      )
      .addMatcher(
        f1Api.endpoints.getConstructorResults.matchPending,
        (state, _) => {
          state.loadConstructorResults = false;
        }
      )
      .addMatcher(
        f1Api.endpoints.getConstructorResults.matchFulfilled,
        (state, action: PayloadAction<F1APIBaseResponse>) => {
          const data = action.payload.MRData as RacesApiResponse;
          const results = data.RaceTable.Races as RaceResults[];
          state.constructorResults = results;
          state.loadConstructorResults = true;
        }
      );
  },
});

export const f1Reducer = f1Slice.reducer;

export const {
  changeActivePage,
  changeDriverSelected,
  changeConstructorSelected,
  changeRaceSelected,
  clearRaceSelected,
} = f1Slice.actions;

export const selectActivePage = (state: RootState) => state.f1.activePage;
export const selectCurrentSeason = (state: RootState) => state.f1.currentSeason;
export const selectDriverSelected = (state: RootState) =>
  state.f1.driverSelected;
export const selectConstructorSelected = (state: RootState) =>
  state.f1.constructorSelected;
export const selectRaceSelected = (state: RootState) => state.f1.raceSelected;
export const selectRaces = (state: RootState) => state.f1.races;
export const selectRace = (state: RootState) => state.f1.race;
export const selectDriverStanding = (state: RootState) =>
  state.f1.driverStanding;
export const selectConstructorStanding = (state: RootState) =>
  state.f1.constructorStanding;
export const selectDrivers = (state: RootState) => state.f1.drivers;
export const selectConstructors = (state: RootState) => state.f1.constructors;
export const selectResultsRace = (state: RootState) => state.f1.resultsRace;
export const selectQualifyingRace = (state: RootState) => state.f1.qualifyingRace;
export const selectDriverSeasons = (state: RootState) => state.f1.driverSeasons;
export const selectDriverResults = (state: RootState) => state.f1.driverResults;
export const selectDriverChampionships = (state: RootState) =>
  state.f1.driverChampionships;
export const selectConstructorSeasons = (state: RootState) =>
  state.f1.constructorSeasons;
export const selectConstructorResults = (state: RootState) =>
  state.f1.constructorResults;
export const selectFirtsRace = (state: RootState) => state.f1.races[0];
export const selectLoadContent = createSelector(
  [(state) => state.f1],
  (f1) => ({
    loadRaces: f1.loadRaces,
    loadRace: f1.loadRace,
    loadDriverStanding: f1.loadDriverStanding,
    loadConstructorStanding: f1.loadConstructorStanding,
    loadDrivers: f1.loadDrivers,
    loadConstructors: f1.loadConstructors,
    loadResults: f1.loadResults,
    loadQualifying: f1.loadQualifying,
    loadDriverSeasons: f1.loadDriverSeasons,
    loadDriverResults: f1.loadDriverResults,
    loadDriverChampionships: f1.loadDriverChampionships,
    loadConstructorSeasons: f1.loadConstructorSeasons,
    loadConstructorResults: f1.loadConstructorResults,
  })
);
