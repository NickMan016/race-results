import { useContext, useEffect, useState } from "react"
import { F1Context } from "../../../../context/F1DB/F1Context"
import { Section } from "../../../Section";
import { SectionLoading } from "../SectionLoading"
import { TableData } from "../TableData";


export const SectionDriverStanding = () => {
    const [isLoad, setIsLoad] = useState(false);
    const { stateDriverStanding, getDriverStanding } = useContext(F1Context);
    const { StandingsTable } = stateDriverStanding

    useEffect(() => {
        const response = getDriverStanding('current/driverStandings');

        setTimeout(() => {
            response.then(value => setIsLoad(value))
        }, 2000);
    }, [])

    return (
        <>
            {
                isLoad ? (
                    <Section title="Driver Championship" content={
                        <div className="mt-2">
                            <TableData tHead={[
                                { text: 'Pos.', center: true },
                                { text: 'Driver', center: false },
                                { text: 'Team', center: false },
                                { text: 'Pts.', center: true }
                            ]} tBody={
                                <tbody>
                                    {
                                        StandingsTable?.StandingsLists[0].DriverStandings?.map((value, index) => {
                                            return (
                                                <tr className="border-gray-700 border-b-[1px] hover:bg-gray-400" key={index}>
                                                    <td className="p-2 text-center">{value.position}</td>
                                                    <td className="p-2 ">{`${value.Driver.givenName.slice(0, 1)}. ${value.Driver.familyName}`}</td>
                                                    <td className="p-2 ">{value.Constructors[0].name}</td>
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