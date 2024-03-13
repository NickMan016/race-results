import { useEffect, useState } from "react";
import { CountriesAPIBaseResponse, Race } from "../../types";
import { ContentSection } from "./ContentSection";
import { useGetFlagsByCountryQuery } from "../../redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

interface ContentSectionRaceScheduleProps {
  race: Race
}

export const ContentSectionRaceSchedule = ({
  race,
}: ContentSectionRaceScheduleProps) => {
  const [flagUrl, setFlagUrl] = useState("");
  const { data } = useGetFlagsByCountryQuery(
    race.Circuit.Location.country
  ) as CountriesAPIBaseResponse;
  const datePractice = moment(
    `${race.FirstPractice?.date}T${
      race.FirstPractice?.time !== undefined
        ? race.FirstPractice?.time
        : "23:59:00Z"
    }`
  );
  const dateRace = moment(
    `${race.date}T${race.time !== undefined ? race.time : "23:59:00Z"}`
  );

  useEffect(() => {
    if (data !== undefined) {
      if (data.length > 1) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if (element.name.common === race.Circuit.Location.country || element.altSpellings.includes(race.Circuit.Location.country)) {
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
    <div className="col-span-6 xl:col-span-2">
      <ContentSection title={`${race.raceName.length <= 20 ? race.raceName : `${race.raceName.slice(0, 20)}...`}`} schedule>
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
        <div className="col-span-1 mt-2 flex justify-end items-center">
          <div className="flex flex-col items-center">
            <p className="text-xl leading-none text-gray-800 dark:text-gray-400">
              {datePractice.format("DD")}
            </p>
            <p className="text-sm text-gray-800 uppercase dark:text-gray-400">
              {datePractice.format("MMM")}
            </p>
          </div>

          <FontAwesomeIcon
            icon={faMinus}
            className="mx-1 text-gray-800 uppercase dark:text-gray-400"
          />

          <div className="flex flex-col items-center">
            <p className="text-xl leading-none text-gray-800 dark:text-gray-400">
              {dateRace.format("DD")}
            </p>
            <p className="text-sm text-gray-800 uppercase dark:text-gray-400">
              {dateRace.format("MMM")}
            </p>
          </div>
        </div>
      </ContentSection>
    </div>
  );
};
