export const SectionLoading = () => {
    return (
        <div className="relative bg-white my-5 p-3 w-full rounded-md shadow-md shadow-gray-500 dark:bg-gray-900 dark:shadow-none">
            <div className="animate-skeleton bg-gray-400 h-7 w-1/3 rounded dark:bg-gray-700"></div>
            <div className="animate-skeleton bg-gray-400 mt-2 h-5 w-full rounded dark:bg-gray-700"></div>
            <div className="animate-skeleton bg-gray-400 mt-2 h-5 w-full rounded dark:bg-gray-700"></div>
            <div className="animate-skeleton bg-gray-400 mt-2 h-60 w-full rounded dark:bg-gray-700"></div>
        </div>
    )
}