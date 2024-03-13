import { useSelector } from "react-redux";
import { ContentSection, ContentSectionRace, ContentSectionRaceSchedule, ContentSectionRaceScheduleFinished } from "../components";
import { selectCurrentSeason, selectRace, selectRaces } from "../redux";

export const SchedulePage = () => {
  const races = useSelector(selectRaces);
  const nextRace = useSelector(selectRace);
  const currentSeason = useSelector(selectCurrentSeason);

  return (
    <>
      <div className="grid grid-cols-6 gap-0 lg:gap-5">
        <div className="col-span-6 xl:col-span-2">
          <ContentSection title={`Schedule ${currentSeason}`}></ContentSection>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-0 lg:gap-5">
        {races.map((value, index) => (
          <>
            {parseInt(value.round) < parseInt(nextRace.round) && (
              <ContentSectionRaceScheduleFinished race={value} key={index} />
            )}
          </>
        ))}
      </div>

      <div className="grid grid-cols-6 gap-0 lg:gap-5">
        <div className="col-span-6 xl:col-span-4">
          <ContentSectionRace />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-0 lg:gap-5">
        {races.map((value, index) => (
          <>
            {parseInt(value.round) > parseInt(nextRace.round) && (
              <ContentSectionRaceSchedule race={value} key={index} />
            )}
          </>
        ))}
      </div>
    </>
  );
};
