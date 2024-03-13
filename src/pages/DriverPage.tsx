import { useSelector } from "react-redux";
import {
  selectCurrentSeason,
  selectDriverChampionships,
  selectDriverResults,
  selectDriverSeasons,
  selectDriverSelected,
  selectLoadContent,
  selectRaces,
  useLazyGetDriverChampionshipsQuery,
  useLazyGetDriverResultsQuery,
  useLazyGetDriverSeasonsQuery,
  useLazyGetRacesQuery,
} from "../redux";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  ContentSectionLoading,
  ContentSectionWithoutTitle,
  TableData,
  TableLoading,
} from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCircle,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
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

export const DriverPage = () => {
  const currentSeason = useSelector(selectCurrentSeason);
  const driver = useSelector(selectDriverSelected);
  const driverSeasons = useSelector(selectDriverSeasons);
  const driverResults = useSelector(selectDriverResults);
  const driverChampionships = useSelector(selectDriverChampionships);
  const races = useSelector(selectRaces);
  const {
    loadDriverSeasons,
    loadRaces,
    loadDriverResults,
    loadDriverChampionships,
  } = useSelector(selectLoadContent);
  const [season, setSeason] = useState<string>("");
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);
  const [getDriverSeasons] = useLazyGetDriverSeasonsQuery();
  const [getDriverResults] = useLazyGetDriverResultsQuery();
  const [getDriverChampionships] = useLazyGetDriverChampionshipsQuery();
  const [getRaces] = useLazyGetRacesQuery();

  const handleRowClick = (id: number) => {
    if (selectedRow === id) {
      setSelectedRow(null);
      setSelectedResult(null);
    } else {
      setSelectedRow(id);
      const result = driverResults.find(
        (race) => race.round === races[id].round
      );
      setSelectedResult(result?.Results[0] || null);
    }
  };

  useEffect(() => {
    getDriverSeasons(driver?.driverId || "");
    getDriverChampionships(driver?.driverId || "");
  }, [getDriverSeasons, getDriverChampionships, driver]);

  useEffect(() => {
    if (driverSeasons[0] !== undefined) {
      setSeason(driverSeasons[0].season);
    }
  }, [driverSeasons]);

  useEffect(() => {
    if (season !== "") {
      getRaces(season);
      getDriverResults({ season, driverId: driver?.driverId || "" });
    }
    setSelectedRow(null);
    setSelectedResult(null);
  }, [getRaces, getDriverResults, season]);

  return (
    <div className="grid grid-cols-6 gap-0 lg:gap-5">
      <div className="col-span-6 xl:col-span-2">
        <ContentSectionWithoutTitle>
          <img
            className="h-32 w-32 m-auto rounded-full"
            src={`https://race-results-api.onrender.com/api/drivers/${driver?.driverId}/image`}
            alt={`Foto de ${driver?.driverId}`}
          />
          <div className="mt-5">
            <div className="text-2xl text-center font-semibold mb-2">{`${driver?.givenName} ${driver?.familyName}`}</div>
            {!loadDriverChampionships ? (
              <>
                <div className="animate-skeleton bg-gray-400 mt-2 h-6 w-full rounded dark:bg-gray-700"></div>
                <div className="animate-skeleton bg-gray-400 mt-2 h-5 w-full rounded dark:bg-gray-700"></div>
                <div className="animate-skeleton bg-gray-400 mt-2 h-5 w-full rounded dark:bg-gray-700"></div>
                <div className="animate-skeleton bg-gray-400 mt-2 h-5 w-full rounded dark:bg-gray-700"></div>
              </>
            ) : (
              <div>
                {driverChampionships.length !== 0 && (
                  <div className="flex justify-center space-x-2 mb-2">
                    {driverChampionships.map((value, index) => (
                      <FontAwesomeIcon
                        icon={faTrophy}
                        className={`text-2xl ${
                          season === value.season && "text-amber-400"
                        }`}
                        key={index}
                      />
                    ))}
                  </div>
                )}
                <div>Number: {driver?.permanentNumber || "Not Number"}</div>
                <div>Natioanlity: {driver?.nationality}</div>
                <div>
                  Date of Birth:&nbsp;
                  {driver?.dateOfBirth !== "" ? moment(driver?.dateOfBirth).format("MMMM DD, YYYY") : 'N/A'}
                </div>
              </div>
            )}
          </div>
        </ContentSectionWithoutTitle>
      </div>

      <div className="col-span-6 xl:col-span-4">
        {!loadDriverSeasons && !loadDriverResults ? (
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
                  {driverSeasons.map((value, index) => (
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
              <div className="col-span-4">
                {loadDriverResults && loadRaces && driverResults !== undefined && (
                  <div className="flex h-full justify-end items-center">
                    <img
                      className="h-14 hidden dark:block"
                      src={`https://race-results-api.onrender.com/api/teams/${driverResults[0].Results[0].Constructor.constructorId}/image/miniImage/dark`}
                      alt=""
                    />
                    <img
                      className="h-14 block dark:hidden"
                      src={`https://race-results-api.onrender.com/api/teams/${driverResults[0].Results[0].Constructor.constructorId}/image/miniImage/light`}
                      alt=""
                    />
                  </div>
                )}
                {/* {!loadDriverResults && !loadRaces && !loadInfoTeam ? (
                  <div className="flex h-full justify-end items-center">
                    <div className="animate-skeleton bg-gray-400 mt-2 h-14 w-1/3 rounded dark:bg-gray-700"></div>
                  </div>
                ) : (
                  <div className="flex h-full justify-end items-center">
                    <img
                      className="h-14 hidden dark:block"
                      src={
                        infoTeam?.miniImage.dark !== undefined
                          ? infoTeam?.miniImage.dark
                          : infoTeam?.miniImage.light
                      }
                      alt=""
                    />
                    <img
                      className="h-14 block dark:hidden"
                      src={infoTeam?.miniImage.light}
                      alt=""
                    />
                  </div>
                )} */}
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
                                  ? "h-32 overflow-clip"
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
                                      <div className="col-span-1">
                                        <div>Grid: {selectedResult?.grid}</div>
                                        <div>
                                          Position: {selectedResult?.position}
                                        </div>
                                        <div>
                                          Points Earned:&nbsp;
                                          {selectedResult?.points}
                                        </div>
                                        <div>
                                          Status:&nbsp;
                                          {allowedStatus.includes(
                                            selectedResult?.status || ""
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
                                      </div>
                                      {selectedResult?.FastestLap !==
                                        undefined && (
                                        <div className="col-span-1">
                                          <div>
                                            Fastest Lap:&nbsp;
                                            {
                                              selectedResult?.FastestLap.Time
                                                .time
                                            }
                                          </div>
                                          <div>
                                            Rank:&nbsp;
                                            {selectedResult?.FastestLap.rank}
                                            {selectedResult?.FastestLap.rank ===
                                              "1" && (
                                              <FontAwesomeIcon
                                                icon={faCircle}
                                                className="text-fuchsia-600 ml-2"
                                              />
                                            )}
                                          </div>
                                          <div>
                                            Lap:&nbsp;
                                            {selectedResult?.FastestLap.lap}
                                          </div>
                                          <div>
                                            Average Speed:&nbsp;
                                            {
                                              selectedResult?.FastestLap
                                                .AverageSpeed.speed
                                            }
                                            &nbsp;
                                            {
                                              selectedResult?.FastestLap
                                                .AverageSpeed.units
                                            }
                                          </div>
                                        </div>
                                      )}
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
