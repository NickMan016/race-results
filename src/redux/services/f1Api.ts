import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetConstructorResultsProps, GetDriverProps, GetDriverResultsProps, GetRaceProps } from "../../types";

export const f1Api = createApi({
  reducerPath: "f1Api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ergast.com/api/f1/" }),
  endpoints: (builder) => ({
    getCurrentSeason: builder.query({
      query: () => 'current/seasons.json',
    }),
    getRaces: builder.query({
      query: (season: string) => `${season}.json`,
    }),
    getRace: builder.query({
      query: ({ season, race }: GetRaceProps) => `${season}/${race}.json`,
    }),
    getDriverStandings: builder.query({
      query: (season: string) => `${season}/driverStandings.json`,
    }),
    getConstructorStandings: builder.query({
      query: (season: string) => `${season}/constructorStandings.json`,
    }),
    getResults: builder.query({
      query: ({ season, race }: GetRaceProps) => `${season}/${race}/results.json`,
    }),
    getDrivers: builder.query({
      query: ({ season, constructor }: GetDriverProps) => `${season}${constructor !== '0' ? `/constructors/${constructor}` : ''}/drivers.json`,
    }),
    getConstructors: builder.query({
      query: (season: string) => `${season}/constructors.json`,
    }),
    getDriverSeasons: builder.query({
      query: (driverId: string) => `drivers/${driverId}/seasons.json?limit=100`,
    }),
    getDriverResults: builder.query({
      query: ({ season, driverId }: GetDriverResultsProps) => `${season}/drivers/${driverId}/results.json?limit=100`,
    }),
    getDriverChampionships: builder.query({
      query: ( driverId: string ) => `drivers/${driverId}/driverStandings/1.json`,
    }),
    getConstructorSeasons: builder.query({
      query: (constructorId: string) => `constructors/${constructorId}/seasons.json?limit=100`,
    }),
    getConstructorResults: builder.query({
      query: ({ season, constructorId }: GetConstructorResultsProps) => `${season}/constructors/${constructorId}/results.json?limit=100`,
    }),
  }),
});
// driverStandings
export const {
  useGetRacesQuery,
  useLazyGetCurrentSeasonQuery,
  useLazyGetRacesQuery,
  useLazyGetRaceQuery,
  useLazyGetConstructorStandingsQuery,
  useLazyGetDriverStandingsQuery,
  useLazyGetDriversQuery,
  useLazyGetConstructorsQuery,
  useLazyGetResultsQuery,
  useLazyGetDriverSeasonsQuery,
  useLazyGetDriverResultsQuery,
  useLazyGetDriverChampionshipsQuery,
  useLazyGetConstructorSeasonsQuery,
  useLazyGetConstructorResultsQuery
} = f1Api;
