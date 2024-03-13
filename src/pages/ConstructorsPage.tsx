import { useDispatch, useSelector } from "react-redux";
import { ContentSection, TableData, TableLoading } from "../components";
import { useEffect, useState } from "react";
import {
  changeConstructorSelected,
  selectConstructors,
  selectCurrentSeason,
  selectLoadContent,
  useLazyGetConstructorsQuery,
} from "../redux";

const headTable = [
  { text: "Name", center: false },
  { text: "Nationality", center: false },
];

export const ConstructorsPage = () => {
  const years = [];
  const dispatch = useDispatch();
  const constructors = useSelector(selectConstructors);
  const { loadConstructors } = useSelector(selectLoadContent);
  const currentSeason = useSelector(selectCurrentSeason);
  const [season, setSeason] = useState<string>("current");
  const [getConstructors] = useLazyGetConstructorsQuery();

  for (let index = parseInt(currentSeason) - 1; index >= 1950; index--) {
    years.push(index);
  }

  useEffect(() => {
    getConstructors(season);
  }, [getConstructors, season]);
  return (
    <ContentSection title="Teams">
      <div className="grid grid-cols-8 col-span-2 gap-4 py-2">
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
            <option value="current">Current</option>
            {years.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="col-span-2">
        <TableData headTable={headTable}>
          {!loadConstructors ? (
            <TableLoading columns={headTable.length} />
          ) : (
            <>
              {constructors.map((value, index) => {
                return (
                  <tr
                    className="border-gray-700 border-b-[1px] cursor-pointer hover:bg-gray-300 dark:border-gray-500 dark:hover:bg-gray-700"
                    key={index}
                    onClick={() => {
                      dispatch(changeConstructorSelected(value));
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
                          <div className="flex items-center">
                            <div className="">
                              {value.name || "Not Name"}
                            </div>
                            <img
                              className="ml-4 mx-auto h-5 hidden dark:block"
                              src={`https://race-results-api.onrender.com/api/teams/${value.constructorId}/image/miniImage/dark`}
                              alt=""
                            />
                            <img
                              className="ml-4 mx-auto h-5 block dark:hidden"
                              src={`https://race-results-api.onrender.com/api/teams/${value.constructorId}/image/miniImage`}
                              alt=""
                            />
                          </div>
                        )}
                        {indexHead === 1 && value.nationality}
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
