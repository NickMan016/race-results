import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useState } from "react"
import { F1Context } from "../../../../context/F1DB/F1Context"
import { Result } from "../../../../interfaces/F1Interfaces"
import { Country } from "../../../../interfaces/CountriesInterfaces"
import { SectionLoading } from "../SectionLoading"

interface propsSection {
    title: string
}

export const SectionResults = ({ title }: propsSection) => {

    const INITIAL_STATE: Country = {
        name: "",
        alpha3Code: "",
        timezones: [],
        flags: {
            png: "",
            svg: ""
        },
        independent: "",
        altSpellings: [],
        region: "",
        capital: ""
    }

    const [isLoad, setIsLoad] = useState(false);
    const { stateResults, getResults } = useContext(F1Context);
    const [stateCountry, setStateCountry] = useState(INITIAL_STATE);
    const { RaceTable } = stateResults;
    const { flags } = stateCountry;

    useEffect(() => {
        getResults('current/last/results', setStateCountry);

        setTimeout(() => {
            setIsLoad(true);
        }, 2000);
    }, [])

    return (
        <>
            {
                isLoad ? (
                    <div className="seccion">
                        <div className="titulo__seccion">{title}</div>
                        <div className="info__seccion">
                            {`${RaceTable?.Races[0].Circuit.circuitName} - ${RaceTable?.Races[0].Circuit.Location.locality}, ${RaceTable?.Races[0].Circuit.Location.country}`}
                            <img className="flag" src={flags.svg} alt={`${RaceTable?.Races[0].Circuit.Location.country}'s flag`} />
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
                                    <th>Team</th>
                                    <th>Time</th>
                                    <th className="center">Status</th>
                                    <th className="center">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {RaceTable?.Races[0].Results?.map((value: Result, index) => {
                                    let status;
                                    console.log(value);
                                    

                                    if (value.FastestLap?.rank === '1') {
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
                ) : (
                    <SectionLoading />
                )
            }
        </>
    )
}