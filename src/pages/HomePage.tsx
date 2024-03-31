import { useEffect } from "react";

import {
  selectQualifyingRace,
  useLazyGetConstructorStandingsQuery,
  useLazyGetDriverStandingsQuery,
  useLazyGetRaceQuery,
  useLazyGetRacesQuery,
  useLazyGetResultsQualifyingQuery,
  useLazyGetResultsQuery,
} from "../redux";
import {
  ContentSectionConstructorStanding,
  ContentSectionDriverStanding,
  ContentSectionFlags,
  ContentSectionRace,
  ContentSectionResultsQualifying,
  ContentSectionResultsRace,
} from "../components/content";
import { useSelector } from "react-redux";

export const HomePage = () => {
  const [getRaces] = useLazyGetRacesQuery();
  const [getRace] = useLazyGetRaceQuery();
  const [getDriverStanding] = useLazyGetDriverStandingsQuery();
  const [getConstructorStanding] = useLazyGetConstructorStandingsQuery();
  const [getQualifying] = useLazyGetResultsQualifyingQuery();
  const [getResults] = useLazyGetResultsQuery();
  const raceQualifying = useSelector(selectQualifyingRace);

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

  useEffect(() => {
    getQualifying({ season: "current", race: "next" });
  }, [getQualifying]);

  // useEffect(() => {
  //     console.log('races', raceQualifying);

  // }, [raceQualifying])

  return (
    <div className="grid grid-cols-6 gap-0 lg:gap-5">
      <div className="col-span-6 xl:col-span-4">
        <ContentSectionRace />
        {raceQualifying.QualifyingResults.length === 0 ? (
          <ContentSectionResultsRace />
        ) : (
          <ContentSectionResultsQualifying />
        )}

        <ContentSectionFlags />
      </div>
      <div className="col-span-6 xl:col-span-2">
        <ContentSectionDriverStanding />
        <ContentSectionConstructorStanding />
      </div>
    </div>
  );
};
