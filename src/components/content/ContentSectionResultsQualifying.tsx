import { useSelector } from "react-redux";
import { HeadTable, TableData } from "../tables";
import { ContentSection } from "./ContentSection";
import { CountriesAPIBaseResponse } from "../../types";
import {
  selectLoadContent,
  selectQualifyingRace,
  useGetFlagsByCountryQuery,
} from "../../redux";
import { useEffect, useState } from "react";
import { ContentSectionLoading } from "./ContentSectionLoading";

const headTable: HeadTable[] = [
  { text: "Pos.", center: true },
  { text: "Driver", center: false },
  { text: "Team", center: false },
  { text: "Q1", center: true },
  { text: "Q2", center: true },
  { text: "Q3", center: true },
];

export const ContentSectionResultsQualifying = () => {
  const raceQualifying = useSelector(selectQualifyingRace);
  const { loadQualifying } = useSelector(selectLoadContent);
  const [flagUrl, setFlagUrl] = useState("");
  const { data } = useGetFlagsByCountryQuery(
    raceQualifying.Circuit.Location.country
  ) as CountriesAPIBaseResponse;

  useEffect(() => {
    data !== undefined && setFlagUrl(data[0].flags.svg);
  }, [data]);

  return (
    <>
      {!loadQualifying ? (
        <ContentSectionLoading />
      ) : (
        <ContentSection title={`${raceQualifying.raceName} Qualifying`}>
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center justify-end space-x-4">
              <div>
                <div className="text-sm text-gray-600 text-right dark:text-gray-400">
                  {raceQualifying.Circuit.circuitName}
                </div>
                <div className="text-lg font-semibold text-right">
                  {`${raceQualifying.Circuit.Location.locality}, ${raceQualifying.Circuit.Location.country}`}
                </div>
              </div>
              <img
                className="inline-block mx-2 h-6 drop-shadow-flag dark:drop-shadow-flag-dark"
                src={flagUrl}
                alt="flag"
              />
            </div>
          </div>
          <div className="col-span-2 mt-2">
            <TableData headTable={headTable}>
              {raceQualifying.QualifyingResults.map((value, index) => {
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
                      {indexHead === 3 && (value.Q1 || "No Time")}
                      {indexHead === 4 && (value.Q2 || "No Time")}
                      {indexHead === 5 && (value.Q3 || "No Time")}
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
