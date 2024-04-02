import { useSelector } from "react-redux";
import { selectConstructorStanding, selectLoadContent } from "../../redux";
import { ContentSectionLoading } from "./ContentSectionLoading";
import { ContentSection } from "./ContentSection";
import { HeadTable, TableData } from "../tables";

const headTable: HeadTable[] = [
    { text: 'Pos.', center: true },
    { text: 'Constructor', center: false },
    { text: 'Pts.', center: true }
];

export const ContentSectionConstructorStanding = () => {
    const constructorStanding = useSelector(selectConstructorStanding);
    const { loadConstructorStanding } = useSelector(selectLoadContent);
    return(
        <>
          {!loadConstructorStanding ? (
            <ContentSectionLoading />
          ) : (
            <ContentSection title="Constructor Championship" fullTile>
              <div className="mt-2 col-span-2">
                <TableData headTable={headTable}>
                  {constructorStanding.map((value, index) => {
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
                            {indexHead === 1 && value.Constructor.name}
                            {indexHead === 2 && value.points}
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
    )
}