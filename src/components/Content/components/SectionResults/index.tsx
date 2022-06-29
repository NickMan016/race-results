import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect } from "react"
import { CountriesContext } from "../../../../context/CountriesDB/CountriesContext"
import { Result } from "../../../../interfaces/F1Interfaces"

interface propsSection {
    loading?: boolean
    title: string
    raceName: string
    locality: string
    country: string
    dataResultTable?: Result[]
}

export const SectionResults = ({ loading = true, title, raceName, locality, country, dataResultTable }: propsSection) => {
    const { stateCountry, getCountry } = useContext(CountriesContext);

    useEffect(() => {
        if (!loading) {
            getCountry(country);
        }
    }, [loading])

    return (
        <>
            {
                !loading ? (
                    <div className="seccion">
                        <div className="titulo__seccion">{title}</div>
                        <div className="info__seccion">
                            {`${raceName} - ${locality}, ${country}`}
                            <img className="flag" src={stateCountry.flags.svg} alt={`${country}'s flag`} />
                        </div>
                        <div className="info__seccion">
                            <span>
                                <FontAwesomeIcon icon={faCircle} className="finished" />
                                Finished
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faCircle} className="dnf" />
                                DNF
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faCircle} className="fastest__lap" />
                                Fastest Lap
                            </span>
                        </div>
                        <table className="tabla">
                            <thead>
                                <tr className="thead">
                                    <th className="center">Pos.</th>
                                    <th>Driver</th>
                                    <th>Constructor</th>
                                    <th>Time</th>
                                    <th className="center">Status</th>
                                    <th className="center">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataResultTable?.map((value: Result, index) => {
                                    let status;

                                    if (value.FastestLap.rank === '1') {
                                        status = <>
                                            <FontAwesomeIcon icon={faCircle} className="finished" />
                                            <FontAwesomeIcon icon={faCircle} className="fastest__lap" />
                                        </>;
                                    } else if (value.status !== 'Finished') {
                                        status = <FontAwesomeIcon icon={faCircle} className="dnf" />;
                                    } else {
                                        status = <FontAwesomeIcon icon={faCircle} className="finished" />;
                                    }
                                    return (
                                        <tr key={index}>
                                            <td className="center">{value.position}</td>
                                            <td>{`${value.Driver.givenName} ${value.Driver.familyName}`}</td>
                                            <td>{value.Constructor.name}</td>
                                            <td>{value.Time?.time || 'No Time'}</td>
                                            <td className="center">{status}</td>
                                            <td className="center">{value.points}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : undefined
            }
        </>
    )
}