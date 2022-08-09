import { useContext, useEffect, useState } from "react"
import { F1Context } from "../../../../context/F1DB/F1Context"
import { Country } from "../../../../interfaces/CountriesInterfaces"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { FormatDate } from "../../../../hooks/FormatDate"
import { SectionLoading } from "../../../Section/components/SectionLoading"
import { Section } from "../../../Section"

export const SectionRace = () => {

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
        const response = getRace(`current/next`, setStateCountry)

        setTimeout(() => {
            response.then(value => setIsLoad(value))
        }, 2000);
    }, []);

    return (
        <>
            {
                isLoad ? (
                    <Section title="Next Race Info" content={
                        <div className="relative grid grid-cols-2 text-lg">
                            <div className="col-span-2 sm:col-span-1">
                                <div>
                                    {`${RaceTable?.Races[0].Circuit.circuitName} - ${RaceTable?.Races[0].Circuit.Location.locality}, ${RaceTable?.Races[0].Circuit.Location.country}`}
                                    <img className="inline-block mx-2 h-4" src={flags.svg} alt={`${RaceTable?.Races[0].Circuit.Location.country}'s flag`} />
                                </div>
                                <div>
                                    <FontAwesomeIcon className="inline-block mr-2" icon={faCalendarDays} />
                                    <FormatDate gmt={true} date={`${RaceTable?.Races[0].date}`} time={`${RaceTable?.Races[0].time}`} region={region} capital={capital} />
                                </div>
                                <div>
                                    <b>Practice 1 -</b>&nbsp;
                                    <FormatDate date={`${RaceTable?.Races[0].FirstPractice.date}`} time={`${RaceTable?.Races[0].FirstPractice.time}`} region={region} capital={capital} />
                                </div>
                                {
                                    (Object.keys(RaceTable?.Races[0].Sprint || {}).length) === 0 ? (
                                        <>
                                            <div>
                                                <b>Practice 2 -</b>&nbsp;
                                                <FormatDate date={`${RaceTable?.Races[0].SecondPractice.date}`} time={`${RaceTable?.Races[0].SecondPractice.time}`} region={region} capital={capital} />
                                            </div>
                                            <div>
                                                <b>Practice 3 -</b>&nbsp;
                                                <FormatDate date={`${RaceTable?.Races[0].ThirdPractice?.date}`} time={`${RaceTable?.Races[0].ThirdPractice?.time}`} region={region} capital={capital} />
                                            </div>
                                            <div>
                                                <b>Qualifying -</b>&nbsp;
                                                <FormatDate date={`${RaceTable?.Races[0].Qualifying.date}`} time={`${RaceTable?.Races[0].Qualifying.time}`} region={region} capital={capital} />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <b>Qualifying -</b>&nbsp;
                                                <FormatDate date={`${RaceTable?.Races[0].Qualifying.date}`} time={`${RaceTable?.Races[0].Qualifying.time}`} region={region} capital={capital} />
                                            </div>
                                            <div>
                                                <b>Practice 2 -</b>&nbsp;
                                                <FormatDate date={`${RaceTable?.Races[0].SecondPractice.date}`} time={`${RaceTable?.Races[0].SecondPractice.time}`} region={region} capital={capital} />
                                            </div>
                                            <div>
                                                <b>Sprint -</b>&nbsp;
                                                <FormatDate date={`${RaceTable?.Races[0].Sprint?.date}`} time={`${RaceTable?.Races[0].Sprint?.time}`} region={region} capital={capital} />
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            <img className="block my-4 mx-auto h-[150px] col-span-2 sm:my-0 sm:col-span-1" src={require(`./../../../../assets/img/circuits/${RaceTable?.Races[0].Circuit.circuitId}.png`)} alt="" />
                        </div>
                    } />
                ) : (
                    <SectionLoading />
                )
            }
        </>
    )
}