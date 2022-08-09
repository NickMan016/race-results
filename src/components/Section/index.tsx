interface PropsSection {
    title: string
    content: JSX.Element
}

export const Section = ({ title, content }: PropsSection) => {
    return (
        <div className="relative bg-white my-5 p-3 w-full rounded-md shadow-md shadow-gray-500 dark:bg-gray-900 dark:shadow-none">
            <div className="text-[1.75rem] leading-none font-bold">{title}</div>
            {content}
        </div>
    )
}