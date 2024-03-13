import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CountriesAPIBaseResponse, Race } from "../../types";
import { ContentSection } from "./ContentSection";
import { changeRaceSelected, useGetFlagsByCountryQuery } from "../../redux";

interface ContentSectionRaceScheduleProps {
  race: Race;
}

export const ContentSectionRaceScheduleFinished = ({
  race,
}: ContentSectionRaceScheduleProps) => {
  const dispatch = useDispatch();
  const [flagUrl, setFlagUrl] = useState("");
  const { data } = useGetFlagsByCountryQuery(
    race.Circuit.Location.country
  ) as CountriesAPIBaseResponse;

  useEffect(() => {
    if (data !== undefined) {
      if (data.length > 1) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if (
            element.name.common === race.Circuit.Location.country ||
            element.altSpellings.includes(race.Circuit.Location.country)
          ) {
            setFlagUrl(element.flags.svg);
            break;
          }
        }
      } else {
        setFlagUrl(data[0].flags.svg);
      }
    }
  }, [data]);

  return (
    <div className="col-span-6 xl:col-span-3">
      <ContentSection title={race.raceName} schedule>
        <div className="col-span-1 flex justify-end">
          <img
            className="inline-block h-6 drop-shadow-flag dark:drop-shadow-flag-dark"
            src={flagUrl}
            alt="flag"
          />
        </div>
        <div className="col-span-2">
          <div className="flex items-center justify-start space-x-4">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {race.Circuit.circuitName}
              </div>
              <div className="text-lg font-medium">
                {`${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex items-end">
          <button
            onClick={() => {
              dispatch(changeRaceSelected(race));
            }}
            className="bg-[#EE0000] text-gray-200 block w-full py-1 rounded"
          >
            About Race
          </button>
        </div>
      </ContentSection>
    </div>
  );
};
