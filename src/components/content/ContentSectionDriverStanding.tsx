import { useSelector } from "react-redux";
import { selectDriverStanding, selectLoadContent } from "../../redux";
import { ContentSectionLoading } from "./ContentSectionLoading";
import { ContentSection } from "./ContentSection";
import { HeadTable, TableData } from "../tables";

const headTable: HeadTable[] = [
  { text: "Pos.", center: true },
  { text: "Driver", center: false },
  { text: "Team", center: false },
  { text: "Pts.", center: true },
];

export const ContentSectionDriverStanding = () => {
  const driverStanding = useSelector(selectDriverStanding);
  const { loadDriverStanding } = useSelector(selectLoadContent);

  return (
    <>
      {!loadDriverStanding ? (
        <ContentSectionLoading />
      ) : (
        <ContentSection title="Driver Championship" fullTile>
          <div className="mt-2 col-span-2">
            <TableData headTable={headTable}>
              {driverStanding.map((value, index) => {
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
                          `${value.Driver.givenName.slice(0, 1)}. ${
                            value.Driver.familyName
                          }`}
                        {indexHead === 2 && value.Constructors[0].name}
                        {indexHead === 3 && value.points}
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
