import { useContext, useEffect, useState } from "react"
import { F1Context } from "../../../../context/F1DB/F1Context"
import { Section } from "../../../Section";
import { SectionLoading } from "../SectionLoading"
import { TableData } from "../TableData";


export const SectionConstructorStanding = () => {
    const [isLoad, setIsLoad] = useState(false);
    const { stateConstructorStanding, getConstructorStanding } = useContext(F1Context);
    const { StandingsTable } = stateConstructorStanding

    useEffect(() => {
        const response = getConstructorStanding('current/constructorStandings');

        setTimeout(() => {
            response.then(value => setIsLoad(value))
        }, 2000);
    }, [])

    return (
        <>
            {
                isLoad ? (
                    <Section title="Constructor Championship" content={
                        <div className="mt-2">
                            <TableData tHead={[
                                { text: 'Pos.', center: true },
                                { text: 'Constructor', center: true },
                                { text: 'Pts.', center: true }
                            ]} tBody={
                                <tbody>
                                    {
                                        StandingsTable?.StandingsLists[0].ConstructorStandings?.map((value, index) => {
                                            return (
                                                <tr className="border-gray-700 border-b-[1px] hover:bg-gray-400" key={index}>
                                                    <td className="p-2 text-center">{value.position}</td>
                                                    <td className="p-2 ">{value.Constructor.name}</td>
                                                    <td className="p-2 text-center">{value.points}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            } />
                        </div>
                    } />
                ) : (
                    <SectionLoading />
                )
            }
        </>
    )
}