import { useEffect } from "react";

import {
  useLazyGetConstructorStandingsQuery,
  useLazyGetDriverStandingsQuery,
  useLazyGetRaceQuery,
  useLazyGetRacesQuery,
  useLazyGetResultsQuery,
} from "../redux";
import {
  ContentSectionConstructorStanding,
  ContentSectionDriverStanding,
  ContentSectionFlags,
  ContentSectionRace,
  ContentSectionResultsRace,
} from "../components/content";

export const HomePage = () => {
  const [getRaces] = useLazyGetRacesQuery();
  const [getRace] = useLazyGetRaceQuery();
  const [getDriverStanding] = useLazyGetDriverStandingsQuery();
  const [getConstructorStanding] = useLazyGetConstructorStandingsQuery();
  const [getResults] = useLazyGetResultsQuery();

  useEffect(() => {
    getRaces("current");
  }, [getRaces]);

  useEffect(() => {
    getRace({ season: "current", race: "next" });
  }, [getRace]);

  useEffect(() => {
    getDriverStanding("current");
  }, [getDriverStanding]);

  useEffect(() => {
    getConstructorStanding("current");
  }, [getConstructorStanding]);

  useEffect(() => {
    getResults({ season: "current", race: "last" });
  }, [getResults]);

  // useEffect(() => {
  //     console.log('races', results);

  // }, [results])

  return (
    <div className="grid grid-cols-6 gap-0 lg:gap-5">
      <div className="col-span-6 xl:col-span-4">
        <ContentSectionRace />
        <ContentSectionResultsRace />
        <ContentSectionFlags />
      </div>
      <div className="col-span-6 xl:col-span-2">
        <ContentSectionDriverStanding />
        <ContentSectionConstructorStanding />
      </div>
    </div>
  );
};
