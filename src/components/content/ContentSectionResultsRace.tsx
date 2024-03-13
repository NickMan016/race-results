import { useSelector } from "react-redux";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { HeadTable, TableData } from "../tables";
import { ContentSection } from "./ContentSection";
import { CountriesAPIBaseResponse } from "../../types";
import {
  selectLoadContent,
  selectResultsRace,
  useGetFlagsByCountryQuery,
} from "../../redux";
import { useEffect, useState } from "react";
import { ContentSectionLoading } from "./ContentSectionLoading";

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

export const ContentSectionResultsRace = () => {
  const raceResults = useSelector(selectResultsRace);
  const { loadResults } = useSelector(selectLoadContent);
  const [flagUrl, setFlagUrl] = useState("");
  const { data } = useGetFlagsByCountryQuery(
    raceResults.Circuit.Location.country
  ) as CountriesAPIBaseResponse;

  useEffect(() => {
    data !== undefined && setFlagUrl(data[0].flags.svg);
  }, [data]);

  return (
    <>
      {!loadResults ? (
        <ContentSectionLoading />
      ) : (
        <ContentSection title={raceResults.raceName}>
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center justify-end space-x-4">
              <div>
                <div className="text-sm text-gray-600 text-right dark:text-gray-400">
                  {raceResults.Circuit.circuitName}
                </div>
                <div className="text-lg font-semibold text-right">
                  {`${raceResults.Circuit.Location.locality}, ${raceResults.Circuit.Location.country}`}
                </div>
              </div>
              <img
                className="inline-block mx-2 h-6 drop-shadow-flag dark:drop-shadow-flag-dark"
                src={flagUrl}
                alt="flag"
              />
            </div>
          </div>
          <div className="col-span-2">
            <div className="mb-1">
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
    </>
  );
};
