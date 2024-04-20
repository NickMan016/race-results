import { useSelector } from "react-redux";
import {
  ContentSection,
  ContentSectionLoading,
  ContentSectionRace,
  ContentSectionRaceSchedule,
  ContentSectionRaceScheduleFinished,
} from "../components";
import {
  selectCurrentSeason,
  selectLoadContent,
  selectRace,
  selectRaces,
  useLazyGetRacesQuery,
} from "../redux";
import React, { useEffect } from "react";

export const SchedulePage = () => {
  const races = useSelector(selectRaces);
  const nextRace = useSelector(selectRace);
  const currentSeason = useSelector(selectCurrentSeason);
  const { loadRaces } = useSelector(selectLoadContent);
  const [getRaces] = useLazyGetRacesQuery();

  useEffect(() => {
    getRaces("current");
  }, [getRaces]);

  return (
    <>
      {!loadRaces ? (
        <div className="grid grid-cols-2 gap-0 lg:gap-5">
          <ContentSectionLoading />
          <ContentSectionLoading />
          <ContentSectionLoading />
          <ContentSectionLoading />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-6 gap-0 lg:gap-5">
            <div className="col-span-6 xl:col-span-2">
              <ContentSection
                title={`Schedule ${currentSeason}`}
              ></ContentSection>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-5">
            {races.map((value, index) => (
              <React.Fragment key={index}>
                {parseInt(value.round) < parseInt(nextRace.round) && (
                  <ContentSectionRaceScheduleFinished
                    race={value}
                    key={index}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="grid grid-cols-6 gap-0 lg:gap-5">
            <div className="col-span-6 xl:col-span-4">
              <ContentSectionRace />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-5">
            {races.map((value, index) => (
              <React.Fragment key={index}>
                {parseInt(value.round) > parseInt(nextRace.round) && (
                  <ContentSectionRaceSchedule race={value} key={index} />
                )}
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </>
  );
};
