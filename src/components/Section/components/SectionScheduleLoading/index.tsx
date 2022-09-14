import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const SectionScheduleLoading = () => {
    return (
        <div className="relative bg-white my-5 p-3 w-full rounded-md shadow-md shadow-gray-500 dark:bg-gray-900 dark:shadow-none">
            <div className="text-[1.75rem] leading-none font-bold">Current Season Schedule</div>
            <div className="flex content-center justify-end mt-1 sm:mt-0 sm:absolute sm:z-50 sm:right-3 sm:top-3 sm:w-1/2">
                <div className="animate-skeleton bg-gray-400 h-6 w-full sm:h-7 sm:w-1/2 rounded dark:bg-gray-700 inline-block"></div>
                <button className="mx-3 mt-1"><FontAwesomeIcon className="text-xl" icon={faChevronCircleLeft} /></button>
                <button><FontAwesomeIcon className="text-xl mt-1" icon={faChevronCircleRight} /></button>
            </div>
            <div className="animate-skeleton bg-gray-400 mt-2 h-5 w-full rounded dark:bg-gray-700"></div>
            <div className="animate-skeleton bg-gray-400 mt-2 h-5 w-full rounded dark:bg-gray-700"></div>
            <div className="animate-skeleton bg-gray-400 mt-2 h-60 w-full rounded dark:bg-gray-700"></div>
        </div>
    )
}