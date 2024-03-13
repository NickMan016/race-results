import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  changeDriverSelected,
  selectConstructors,
  selectCurrentSeason,
  selectDrivers,
  selectLoadContent,
  useLazyGetConstructorsQuery,
  useLazyGetDriversQuery,
} from "../redux";
import { ContentSection, TableData, TableLoading } from "../components";

const headTable = [
  { text: "", center: true },
  { text: "Driver", center: false },
  { text: "Number", center: false },
  { text: "Nationality", center: false },
];

export const DriversPage = () => {
  const years = [];
  const dispatch = useDispatch();
  const drivers = useSelector(selectDrivers);
  const constructors = useSelector(selectConstructors);
  const { loadDrivers, loadConstructors } = useSelector(selectLoadContent);
  const currentSeason = useSelector(selectCurrentSeason);
  const [season, setSeason] = useState<string>("current");
  const [team, setTeam] = useState<string>("0");
  const [getDrivers] = useLazyGetDriversQuery();
  const [getConstructors] = useLazyGetConstructorsQuery();

  for (let index = parseInt(currentSeason) - 1; index >= 1950; index--) {
    years.push(index);
  }

  useEffect(() => {
    getDrivers({ season, constructor: team });
  }, [getDrivers, season, team]);

  useEffect(() => {
    getConstructors(season);
  }, [getConstructors, season]);

  return (
    <ContentSection title="Drivers">
      <div className="grid grid-cols-8 col-span-2 gap-4 py-2">
        <div className="col-span-2">
          <label className="font-bold block" htmlFor="season">
            Season
          </label>
          <select
            className="block outline-none w-full mt-1 p-2 bg-transparent border-gray-400 border-[3px] rounded-md dark:border-gray-700 dark:bg-gray-900"
            value={season}
            onChange={(e) => {
              setTeam('0');
              setSeason(e.target.value);
            }}
            name="season"
            id="season"
          >
            <option value="current">Current</option>
            {years.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label className="font-bold block" htmlFor="team">
            Team
          </label>
          <select
            className="block outline-none w-full mt-1 p-2 bg-transparent border-gray-400 border-[3px] rounded-md dark:border-gray-700 dark:bg-gray-900"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            name="team"
            id="team"
          >
            <option value="0">All</option>
            {loadConstructors && (
              <>
                {constructors.map((value, index) => (
                  <option key={index} value={value.constructorId}>
                    {value.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
      </div>

      <div className="col-span-2">
        <TableData headTable={headTable}>
          {!loadDrivers || !loadConstructors ? (
            <TableLoading image={true} columns={headTable.length - 1} />
          ) : (
            <>
              {drivers.map((value, index) => {
                return (
                  <tr
                    className="border-gray-700 border-b-[1px] cursor-pointer hover:bg-gray-300 dark:border-gray-500 dark:hover:bg-gray-700"
                    key={index}
                    onClick={() => {
                      dispatch(changeDriverSelected(value));
                    }}
                  >
                    {headTable.map((item, indexHead) => (
                      <td
                        className={`p-2 text-sm ${
                          item.center && "text-center"
                        }`}
                        key={indexHead}
                      >
                        {indexHead === 0 && (
                          <img
                            className="h-7 w-7 m-auto rounded-full"
                            src={`https://race-results-api.onrender.com/api/drivers/${value.driverId}/image`}
                            alt={`Foto de ${value.driverId}`}
                          />
                        )}
                        {indexHead === 1 &&
                          `${value.givenName} ${value.familyName}`}
                        {indexHead === 2 &&
                          (value.permanentNumber || "Not Number")}
                        {indexHead === 3 && value.nationality}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </>
          )}
        </TableData>
      </div>
    </ContentSection>
  );
};
