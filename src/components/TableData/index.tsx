
interface PropsTableData {
    tHead: dataTHead[]
    tBody: JSX.Element
}

export interface dataTHead {
    text: string
    center: boolean
}

export const TableData = ({ tHead, tBody }: PropsTableData) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full mt-1 border-collapse text-left overflow-hidden whitespace-nowrap rounded-[5px] border-[#EE0000] border-b-2">
                <thead>
                    <tr className="bg-[#EE0000] text-white text-[1.25rem]">
                        {
                            tHead.map((value, index) => (
                                <th key={index} className={`text-[1.1rem] p-2 ${value.center ? 'text-center' : 'text-left'}`}>{value.text}</th>
                            ))
                        }
                    </tr>
                </thead>
                {tBody}
            </table>
        </div>
    )
}