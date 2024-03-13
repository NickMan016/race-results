import { ReactNode } from "react";

interface PropsSection {
  children: ReactNode;
}

export const ContentSectionWithoutTitle = ({ children }: PropsSection) => {
  return (
    <div className="relative bg-white my-5 p-3 w-full rounded-md shadow-md shadow-gray-500 dark:bg-gray-900 dark:shadow-none">
      {children}
    </div>
  );
};
