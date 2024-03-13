import moment from "moment";

export interface ContentFormatDateProps {
  title: string;
  date?: string;
  time?: string;
}

export const ContentFormatDate = ({
  title,
  date,
  time,
}: ContentFormatDateProps) => {
  const fecha = moment(`${date}T${time !== undefined ? time : '23:59:00Z'}`);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-col items-center">
        <p className="text-xl leading-none text-gray-800 dark:text-gray-400">
          {fecha.format("DD")}
        </p>
        <p className="text-sm text-gray-800 uppercase dark:text-gray-400">
          {fecha.format("MMM")}
        </p>
      </div>

      <div className="flex flex-col justify-between justify-items-center">
        {time !== undefined && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {fecha.format("hh:mm [hrs]")}
          </p>
        )}
        <h2 className="text-lg leading-none font-semibold">{title}</h2>
      </div>
    </div>
  );
};
