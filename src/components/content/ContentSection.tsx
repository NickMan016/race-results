import { ReactNode } from "react";

interface PropsSection {
  title: string;
  schedule?: boolean;
  fullTile?: boolean;
  children?: ReactNode;
}

export const ContentSection = ({ title, schedule = false, fullTile = false, children }: PropsSection) => {
  return (
    <div className={`${!schedule && 'my-5'} relative bg-white p-3 w-full rounded-md shadow-md shadow-gray-500 dark:bg-gray-900 dark:shadow-none`}>
      <div className={`relative grid ${schedule ? 'grid-cols-3' : 'grid-cols-2'}`}>
        <div className={`col-span-2 ${!schedule && 'sm:col-span-1'} ${fullTile && 'sm:col-span-2'}`}>
          <div className={`${schedule ? 'text-xl' : 'text-2xl'} leading-none font-bold`}>{title}</div>
        </div>
        {children}
      </div>
    </div>
  );
};
