import { useSelector } from "react-redux";
import {
  selectConstructorResults,
  selectConstructorSeasons,
  selectConstructorSelected,
  selectCurrentSeason,
  selectLoadContent,
  selectRaces,
  useLazyGetConstructorResultsQuery,
  useLazyGetConstructorSeasonsQuery,
  useLazyGetRacesQuery,
} from "../redux";
import React, { useEffect, useState } from "react";
import {
  ContentSectionLoading,
  ContentSectionWithoutTitle,
  TableData,
  TableLoading,
} from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCircle } from "@fortawesome/free-solid-svg-icons";
import { Result } from "../types";

const headTable = [
  { text: "", center: true },
  { text: "Race", center: false },
  { text: "Circuit", center: false },
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

export const ConstructorPage = () => {
  const currentSeason = useSelector(selectCurrentSeason);
  const constructor = useSelector(selectConstructorSelected);
  const constructorSeasons = useSelector(selectConstructorSeasons);
  const constructorResults = useSelector(selectConstructorResults);
  const races = useSelector(selectRaces);
  const { loadConstructorSeasons, loadRaces } = useSelector(selectLoadContent);
  const [season, setSeason] = useState<string>("");
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedResult, setSelectedResult] = useState<Result[] | null>(null);
  const [getConstructorSeasons] = useLazyGetConstructorSeasonsQuery();
  const [getConstructorResults] = useLazyGetConstructorResultsQuery();
  // const [getDriverChampionships] = useLazyGetDriverChampionshipsQuery();
  const [getRaces] = useLazyGetRacesQuery();

  const handleRowClick = (id: number) => {
    if (selectedRow === id) {
      setSelectedRow(null);
      setSelectedResult(null);
    } else {
      setSelectedRow(id);
      const result = constructorResults.find(
        (race) => race.round === races[id].round
      );

      setSelectedResult(result?.Results || null);
    }
  };

  useEffect(() => {
    getConstructorSeasons(constructor?.constructorId || "");
    // getDriverChampionships(driver?.driverId || "");
  }, [getConstructorSeasons, constructor]);

  useEffect(() => {
    if (constructorSeasons !== undefined) {
      if (constructorSeasons.length !== 0) {
          setSeason(constructorSeasons[0].season);
      }
    }
  }, [constructorSeasons]);

  useEffect(() => {
    if (season !== "") {
      getRaces(season);
      getConstructorResults({
        season,
        constructorId: constructor?.constructorId || "",
      });
    }
    setSelectedRow(null);
    setSelectedResult(null);
  }, [getRaces, getConstructorResults, season]);

  return (
    <div className="grid grid-cols-6 gap-0 lg:gap-5">
      <div className="col-span-6 xl:col-span-2">
        <ContentSectionWithoutTitle>
          <img
            className="max-h-20 max-w-full mx-auto mt-2 hidden dark:block"
            src={`https://race-results-api.onrender.com/api/teams/${constructor?.constructorId}/image/miniImage/dark`}
            alt={`Foto de ${constructor?.constructorId}`}
          />
          <img
            className="max-h-20 max-w-full mx-auto mt-2 block dark:hidden"
            src={`https://race-results-api.onrender.com/api/teams/${constructor?.constructorId}/image/miniImage`}
            alt={`Foto de ${constructor?.constructorId}`}
          />
          <div className="mt-3">
            <div className="text-2xl text-center font-semibold mb-2">{`${constructor?.name}`}</div>
            <div>Natioanlity: {constructor?.nationality}</div>
            {/* <div>Championships: {!loadDriverChampionships ? 'N/A' : driverChampionships}</div> */}
          </div>
        </ContentSectionWithoutTitle>
      </div>

      <div className="col-span-6 xl:col-span-4">
        {!loadConstructorSeasons ? (
          <div className="col-span-4">
            <ContentSectionLoading />
          </div>
        ) : (
          <ContentSectionWithoutTitle>
            <div className="grid grid-cols-6 mb-4">
              <div className="col-span-2">
                <label className="font-bold block" htmlFor="season">
                  Season
                </label>
                <select
                  className="block outline-none w-full mt-1 p-2 bg-transparent border-gray-400 border-[3px] rounded-md dark:border-gray-700 dark:bg-gray-900"
                  value={season}
                  onChange={(e) => {
                    setSeason(e.target.value);
                  }}
                  name="season"
                  id="season"
                >
                  {constructorSeasons.map((value, index) => (
                    <React.Fragment key={index}>
                      {value.season === currentSeason ? (
                        <option value="current">Current</option>
                      ) : (
                        <option value={value.season}>{value.season}</option>
                      )}
                    </React.Fragment>
                  ))}
                </select>
              </div>
            </div>
            <TableData headTable={headTable}>
              {!loadRaces ? (
                <TableLoading columns={headTable.length} />
              ) : (
                <>
                  {races.map((value, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr
                          className="border-gray-700 border-b-[1px] cursor-pointer hover:bg-gray-300 dark:border-gray-500 dark:hover:bg-gray-700"
                          onClick={() => handleRowClick(index)}
                        >
                          {headTable.map((item, indexHead) => (
                            <td
                              className={`p-2 text-sm ${
                                item.center && "text-center"
                              }`}
                              key={indexHead}
                            >
                              {indexHead === 0 && (
                                <FontAwesomeIcon
                                  icon={faChevronRight}
                                  className="text-sm"
                                />
                              )}
                              {indexHead === 1 && value.raceName}
                              {indexHead === 2 && value.Circuit.circuitName}
                            </td>
                          ))}
                        </tr>
                        <tr
                          className={`${
                            selectedRow === index && "border-b-[1px]"
                          } border-gray-700 dark:border-gray-500`}
                        >
                          <td colSpan={3}>
                            <div
                              className={`transition-all duration-500 ease-in-out ${
                                selectedRow === index
                                  ? "h-36 overflow-clip"
                                  : "h-0 overflow-hidden"
                              }`}
                            >
                              {selectedRow === index ? (
                                <>
                                  {selectedResult === null ? (
                                    <div className="flex items-center justify-center w-full h-full">
                                      <div>Race result not found</div>
                                    </div>
                                  ) : (
                                    <div className="p-3 grid grid-cols-2">
                                      {selectedResult.map((value, index) => (
                                        <div className="col-span-1" key={index}>
                                          <div className="flex items-center space-x-4">
                                            <div className="flex flex-col items-center">
                                              <img
                                                className="h-10 w-10 m-auto rounded-full"
                                                src={`https://race-results-api.onrender.com/api/drivers/${value.Driver.driverId}/image`}
                                                alt={`Foto de ${value.Driver.driverId}`}
                                              />
                                            </div>

                                            <div className="flex flex-col justify-between justify-items-center">
                                              <p className="text-sm text-gray-950 dark:text-gray-400">
                                                {value.Driver.givenName}
                                              </p>
                                              <h2 className="text-base font-semibold">
                                                {value.Driver.familyName}
                                              </h2>
                                            </div>
                                          </div>
                                          <div className="mt-1">
                                            <div>
                                              Status:&nbsp;
                                              {allowedStatus.includes(
                                                value.status || ""
                                              ) ? (
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
                                            </div>
                                            <div>
                                              Position: {value.position}
                                            </div>
                                            <div>Points: {value.points}</div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="p-3 grid grid-cols-2">
                                  <div className="col-span-1">
                                    <div className="animate-skeleton bg-gray-400 mt-2 h-5 w-1/2 rounded dark:bg-gray-700"></div>
                                    <div className="animate-skeleton bg-gray-400 mt-2 h-5 w-1/2 rounded dark:bg-gray-700"></div>
                                    <div className="animate-skeleton bg-gray-400 mt-2 h-5 w-2/3 rounded dark:bg-gray-700"></div>
                                  </div>
                                  <div className="col-span-1">
                                    <div className="animate-skeleton bg-gray-400 mt-2 h-5 w-2/3 rounded dark:bg-gray-700"></div>
                                    <div className="animate-skeleton bg-gray-400 mt-2 h-5 w-1/2 rounded dark:bg-gray-700"></div>
                                    <div className="animate-skeleton bg-gray-400 mt-2 h-5 w-2/3 rounded dark:bg-gray-700"></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </>
              )}
            </TableData>
          </ContentSectionWithoutTitle>
        )}
      </div>
    </div>
  );
};
