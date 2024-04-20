import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { ContentSection } from "./ContentSection";
import { ContentFormatDate } from "./ContentFormatDate";
import { CountriesAPIBaseResponse, Race } from "../../types";
import {
  selectLoadContent,
  selectRace,
  selectRaces,
  useGetFlagsByCountryQuery,
} from "../../redux";
import { ContentSectionLoading } from "./ContentSectionLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarXmark } from "@fortawesome/free-regular-svg-icons";

export const ContentSectionRace = () => {
  const races = useSelector(selectRaces);
  const raceFind = useSelector(selectRace);
  const { loadRace } = useSelector(selectLoadContent);
  const [race, setRace] = useState<Race>();
  const [flagUrl, setFlagUrl] = useState("");
  const { data } = useGetFlagsByCountryQuery(
    raceFind.Circuit.Location.country
  ) as CountriesAPIBaseResponse;

  useEffect(() => {
    const race = races.find((race) => {
      return race.Circuit.circuitId === raceFind.Circuit.circuitId;
    });
    setRace(race);
    // console.log(raceFind.ThirdPractice);
    // console.log(race);
  }, [raceFind, races]);

  useEffect(() => {
    if (data !== undefined) {
      if (data.length > 1) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if (
            element.name.common === raceFind.Circuit.Location.country ||
            element.altSpellings.includes(raceFind.Circuit.Location.country)
          ) {
            setFlagUrl(element.flags.svg);
            break;
          }
        }
      } else {
        setFlagUrl(data[0].flags.svg);
      }
    }
  }, [data, raceFind.Circuit.Location.country]);

  return (
    <>
      {!loadRace ? (
        <ContentSectionLoading />
      ) : (
        <ContentSection title={raceFind.raceName}>
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center justify-end space-x-4">
              <div>
                <div className="text-sm text-gray-600 text-right dark:text-gray-400">
                  {raceFind.Circuit.circuitName}
                </div>
                <div className="text-lg font-semibold text-right">
                  {`${raceFind.Circuit.Location.locality}, ${raceFind.Circuit.Location.country}`}
                </div>
              </div>
              <img
                className="inline-block mx-2 h-6 drop-shadow-flag dark:drop-shadow-flag-dark"
                src={flagUrl}
                alt="flag"
              />
            </div>
          </div>

          {raceFind.date === undefined || raceFind.time === undefined ? (
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center">
                  <FontAwesomeIcon
                    icon={faCalendarXmark}
                    className="text-[#EE0000] text-4xl"
                  />
                </div>

                <div className="flex flex-col justify-between justify-items-center">
                  <p className="text-base text-gray-950 dark:text-gray-400">
                    Schedules not available at the moment
                  </p>
                  <p className="text-base text-gray-950 dark:text-gray-400">
                    Try again later
                  </p>
                  {/* <h2 className="text-lg font-semibold">{title}</h2> */}
                </div>
              </div>
            </div>
          ) : (
            <div className="col-span-2 sm:col-span-1">
              <ContentFormatDate
                title="Race"
                date={raceFind.date !== undefined ? raceFind.date : race?.date}
                time={raceFind.time !== undefined ? raceFind.time : race?.time}
              />

              <div className="flex flex-row justify-between mt-1 space-x-8 space-y-2">
                <ContentFormatDate
                  title="Qualifying"
                  date={
                    raceFind.Qualifying?.date !== undefined
                      ? raceFind.Qualifying?.date
                      : race?.Qualifying?.date
                  }
                  time={
                    raceFind.Qualifying?.time !== undefined
                      ? raceFind.Qualifying?.time
                      : race?.Qualifying?.time
                  }
                />
                <ContentFormatDate
                  title={
                    raceFind.ThirdPractice === undefined
                      ? "Sprint"
                      : "Practice 3"
                  }
                  date={
                    raceFind.ThirdPractice === undefined
                      ? raceFind.Sprint?.date !== undefined
                        ? raceFind.Sprint?.date
                        : race?.Sprint?.date
                      : raceFind.ThirdPractice?.date !== undefined
                      ? raceFind.ThirdPractice?.date
                      : race?.ThirdPractice?.date
                  }
                  time={
                    raceFind.ThirdPractice === undefined
                      ? raceFind.Sprint?.time !== undefined
                        ? raceFind.Sprint?.time
                        : race?.Sprint?.time
                      : raceFind.ThirdPractice?.time !== undefined
                      ? raceFind.ThirdPractice?.time
                      : race?.ThirdPractice?.time
                  }
                />
              </div>

              <div className="flex flex-row justify-between space-x-8 space-y-2">
                <ContentFormatDate
                  title={
                    raceFind.ThirdPractice === undefined
                      ? "Sprint Qualifying"
                      : "Practice 2"
                  }
                  date={
                    raceFind.SecondPractice?.date !== undefined
                      ? raceFind.SecondPractice?.date
                      : race?.SecondPractice?.date
                  }
                  time={
                    raceFind.SecondPractice?.time !== undefined
                      ? raceFind.SecondPractice?.time
                      : race?.SecondPractice?.time
                  }
                />
                <ContentFormatDate
                  title="Practice 1"
                  date={
                    raceFind.FirstPractice?.date !== undefined
                      ? raceFind.FirstPractice?.date
                      : race?.FirstPractice?.date
                  }
                  time={
                    raceFind.FirstPractice?.time !== undefined
                      ? raceFind.FirstPractice?.time
                      : race?.FirstPractice?.time
                  }
                />
              </div>
            </div>
          )}

          <div className="col-span-2 py-3 sm:col-span-1 sm:my-0">
            <img
              className="block mx-auto h-[150px] drop-shadow-image"
              src={`https://race-results-api.onrender.com/api/circuits/${raceFind.Circuit.circuitId}/image`}
              alt=""
            />
          </div>
        </ContentSection>
      )}
    </>
  );
};
