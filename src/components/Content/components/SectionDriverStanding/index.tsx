import { useContext, useEffect, useState } from "react"
import { F1Context } from "../../../../context/F1DB/F1Context"
import { SectionLoading } from "../SectionLoading"


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
                    <div className="seccion">
                        <div className="titulo__seccion">Driver Championship</div>
                        <table className="tabla">
                            <thead>
                                <tr className="thead">
                                    <th className="center">Pos.</th>
                                    <th>Driver</th>
                                    <th>Team</th>
                                    <th className="center">Pts.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    StandingsTable?.StandingsLists[0].DriverStandings?.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="center">{value.position}</td>
                                                <td>{`${value.Driver.givenName.slice(0, 1)}. ${value.Driver.familyName}`}</td>
                                                <td>{value.Constructors[0].name}</td>
                                                <td className="center">{value.points}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <SectionLoading />
                )
            }
        </>
    )
}