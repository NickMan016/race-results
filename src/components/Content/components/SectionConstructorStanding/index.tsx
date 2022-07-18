import { useContext, useEffect, useState } from "react"
import { F1Context } from "../../../../context/F1DB/F1Context"
import { SectionLoading } from "../SectionLoading"


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
                    <div className="seccion">
                        <div className="titulo__seccion">Constructor Championship</div>
                        <div className="contenedor__tabla">
                            <table className="tabla">
                                <thead>
                                    <tr className="thead">
                                        <th className="center">Pos.</th>
                                        <th>Constructor</th>
                                        <th className="center">Pts.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        StandingsTable?.StandingsLists[0].ConstructorStandings?.map((value, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="center">{value.position}</td>
                                                    <td>{value.Constructor.name}</td>
                                                    <td className="center">{value.points}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <SectionLoading />
                )
            }
        </>
    )
}