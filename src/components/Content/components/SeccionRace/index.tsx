import { useContext, useEffect, useState } from "react"
import { F1Context } from "../../../../context/F1DB/F1Context"
import { Country } from "../../../../interfaces/CountriesInterfaces"
import { SectionLoading } from "../SectionLoading"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { FormatDate } from "../../../../hooks/FormatDate"

interface propsSection {
    title: string
    round: number
}

export const SectionRace = ({ title, round }: propsSection) => {

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
    const { stateRace, getRace } = useContext(F1Context);
    const [stateCountry, setStateCountry] = useState(INITIAL_STATE);
    const { RaceTable } = stateRace;
    const { flags, region, capital } = stateCountry;

    useEffect(() => {
        const response = getRace(`current/${round + 1}`, setStateCountry)

        setTimeout(() => {
            response.then(value => setIsLoad(value))
        }, 2000);
    }, []);

    return (
        <>
            {
                isLoad ? (
                    <div className="seccion grid__seccion">
                        <div className="subgrid__seccion">
                            <div className="titulo__seccion">{title}</div>
                            <div className="info__seccion">
                                {`${RaceTable?.Races[0].Circuit.circuitName} - ${RaceTable?.Races[0].Circuit.Location.locality}, ${RaceTable?.Races[0].Circuit.Location.country}`}
                                <img className="flag" src={flags.svg} alt={`${RaceTable?.Races[0].Circuit.Location.country}'s flag`} />
                            </div>
                            <div className="info__seccion">
                                <FontAwesomeIcon icon={faCalendarDays} />
                                <FormatDate gmt={true} date={`${RaceTable?.Races[0].date}`} time={`${RaceTable?.Races[0].time}`} region={region} capital={capital} />
                            </div>
                            <div className="info__seccion">
                                <b>Practice 1 -</b>&nbsp;
                                <FormatDate date={`${RaceTable?.Races[0].FirstPractice.date}`} time={`${RaceTable?.Races[0].FirstPractice.time}`} region={region} capital={capital} />
                            </div>
                            {
                                (Object.keys(RaceTable?.Races[0].Sprint || {}).length) === 0 ? (
                                    <>
                                        <div className="info__seccion">
                                            <b>Practice 2 -</b>&nbsp;
                                            <FormatDate date={`${RaceTable?.Races[0].SecondPractice.date}`} time={`${RaceTable?.Races[0].SecondPractice.time}`} region={region} capital={capital} />
                                        </div>
                                        <div className="info__seccion">
                                            <b>Practice 3 -</b>&nbsp;
                                            <FormatDate date={`${RaceTable?.Races[0].ThirdPractice?.date}`} time={`${RaceTable?.Races[0].ThirdPractice?.time}`} region={region} capital={capital} />
                                        </div>
                                        <div className="info__seccion">
                                            <b>Qualifying -</b>&nbsp;
                                            <FormatDate date={`${RaceTable?.Races[0].Qualifying.date}`} time={`${RaceTable?.Races[0].Qualifying.time}`} region={region} capital={capital} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="info__seccion">
                                            <b>Qualifying -</b>&nbsp;
                                            <FormatDate date={`${RaceTable?.Races[0].Qualifying.date}`} time={`${RaceTable?.Races[0].Qualifying.time}`} region={region} capital={capital} />
                                        </div>
                                        <div className="info__seccion">
                                            <b>Practice 2 -</b>&nbsp;
                                            <FormatDate date={`${RaceTable?.Races[0].SecondPractice.date}`} time={`${RaceTable?.Races[0].SecondPractice.time}`} region={region} capital={capital} />
                                        </div>
                                        <div className="info__seccion">
                                            <b>Sprint -</b>&nbsp;
                                            <FormatDate date={`${RaceTable?.Races[0].Sprint?.date}`} time={`${RaceTable?.Races[0].Sprint?.time}`} region={region} capital={capital} />
                                        </div>
                                    </>
                                )
                            }
                        </div>

                        <div className="subgrid__seccion">
                            <img className="image__circuit" src={require(`./../../../../assets/img/circuits/${RaceTable?.Races[0].Circuit.circuitId}.png`)} alt="" />
                        </div>
                    </div>
                ) : (
                    <SectionLoading />
                )
            }
        </>
    )
}