import { ReactNode } from "react";

interface ContentTableDataProps {
  headTable: HeadTable[];
  children: ReactNode;
}

export interface HeadTable {
  text: string;
  center: boolean;
}

export const TableData = ({
  headTable,
  children,
}: ContentTableDataProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full mt-1 border-collapse text-gray-950 text-left overflow-hidden whitespace-nowrap rounded-[5px] border-[#EE0000] border-b-2 dark:text-gray-200">
        <thead>
          <tr className="bg-[#EE0000] text-white text-[1.25rem]">
            {headTable.map((value, index) => (
              <th
                key={index}
                className={`text-[1.1rem] text-base p-2 ${
                  value.center ? "text-center" : "text-left"
                }`}
              >
                {value.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
