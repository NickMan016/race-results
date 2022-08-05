export const SectionLoading = () => {
    return (
        <div className="relative bg-white my-5 p-3 w-full rounded-md shadow-md shadow-gray-500 animate-skeleton">
            <div className="bg-gray-400 h-7 w-1/3 rounded"></div>
            <div className="bg-gray-400 mt-2 h-5 w-full rounded"></div>
            <div className="bg-gray-400 mt-2 h-5 w-full rounded"></div>
            <div className="bg-gray-400 mt-2 h-60 w-full rounded"></div>
        </div>
    )
}