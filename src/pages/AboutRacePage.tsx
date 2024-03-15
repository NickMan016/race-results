import { useSelector } from "react-redux";
import {
  ContentSection,
  ContentSectionLoading,
  ContentSectionWithoutTitle,
  HeadTable,
  TableData,
} from "../components";
import {
  selectLoadContent,
  selectRaceSelected,
  selectResultsRace,
  useGetFlagsByCountryQuery,
  useLazyGetResultsQuery,
} from "../redux";
import { useEffect, useState } from "react";
import { CountriesAPIBaseResponse } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const headTable: HeadTable[] = [
  { text: "Pos.", center: true },
  { text: "Driver", center: false },
  { text: "Team", center: false },
  { text: "Time", center: false },
  { text: "Status", center: true },
  { text: "Points", center: true },
];

const allowedStatus = [
  "Finished",
  "+1 Lap",
  "+2 Laps",
  "+3 Laps",
  "+4 Laps",
  "+5 Laps",
  "+6 Laps",
  "+7 Laps",
  "+8 Laps",
  "+9 Laps",
];

export const AboutRacePage = () => {
  const race = useSelector(selectRaceSelected);
  const raceResults = useSelector(selectResultsRace);
  const { loadResults } = useSelector(selectLoadContent);
  const [flagUrl, setFlagUrl] = useState("");
  const { data } = useGetFlagsByCountryQuery(
    race?.Circuit.Location.country || ""
  ) as CountriesAPIBaseResponse;
  const [getResults] = useLazyGetResultsQuery();

  useEffect(() => {
    if (race !== undefined) {
      getResults({ season: race.season, race: race.round });
    }
  }, [getResults]);

  useEffect(() => {
    if (data !== undefined && race !== undefined) {
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
    <div className="grid grid-cols-6 gap-0 lg:gap-5">
      <div className="col-span-6 xl:col-span-2 my-5">
        <ContentSection
          title={`${
            race !== undefined && race.raceName.length <= 20
              ? race.raceName
              : `${race?.raceName.slice(0, 20)}...`
          }`}
          schedule
        >
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
                  {race?.Circuit.circuitName}
                </div>
                <div className="text-lg font-medium">
                  {`${race?.Circuit.Location.locality}, ${race?.Circuit.Location.country}`}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 mt-4 mb-2">
            {race !== undefined && (
              <img
                className="block mx-auto w-full drop-shadow-image"
                src={`https://race-results-api.onrender.com/api/circuits/${race.Circuit.circuitId}/image`}
                alt=""
              />
            )}
          </div>
        </ContentSection>
      </div>
      <div className="col-span-6 xl:col-span-4">
        {!loadResults ? (
          <ContentSectionLoading />
        ) : (
          <ContentSection title="Race Result">
            <div className="col-span-2">
              <div className="mt-2 mb-1">
                <span className="mr-4">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="mr-2 text-green-600"
                  />
                  Finished
                </span>
                <span className="mr-4">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="mr-2 text-red-600"
                  />
                  DNF
                </span>
                <span className="mr-4">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="mr-2 text-fuchsia-600"
                  />
                  Fastest Lap
                </span>
              </div>
              <TableData headTable={headTable}>
                {raceResults.Results.map((value, index) => {
                  return (
                    <tr
                      className="border-gray-700 border-b-[1px] hover:bg-gray-300 dark:border-gray-500 dark:hover:bg-gray-700"
                      key={index}
                    >
                      {headTable.map((item, indexHead) => (
                        <td
                          className={`p-2 text-sm ${
                            item.center && "text-center"
                          }`}
                          key={indexHead}
                        >
                          {indexHead === 0 && value.position}
                          {indexHead === 1 &&
                            `${value.Driver.givenName} ${value.Driver.familyName}`}
                          {indexHead === 2 && value.Constructor.name}
                          {indexHead === 3 &&
                            `${
                              value.Time?.time ||
                              (allowedStatus.includes(value.status)
                                ? value.status
                                : "No Time")
                            }`}
                          {indexHead === 4 && (
                            <>
                              {allowedStatus.includes(value.status) ? (
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  className="text-green-600"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  className="text-red-600"
                                />
                              )}
                              {value.FastestLap?.rank === "1" && (
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  className="text-fuchsia-600 ml-2"
                                />
                              )}
                            </>
                          )}
                          {indexHead === 5 && value.points}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </TableData>
            </div>
          </ContentSection>
        )}
      </div>
    </div>
  );
};
