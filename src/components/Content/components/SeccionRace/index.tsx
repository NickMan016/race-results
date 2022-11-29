import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { F1Context } from "../../../../context/F1DB/F1Context"
import { Country } from "../../../../interfaces/CountriesInterfaces"
import { FormatDate } from "../../../../hooks/FormatDate"
import { SectionLoading } from "../../../Section/components/SectionLoading"
import { Section } from "../../../Section"

interface PropsSectionRace {
    showSectionRace: Dispatch<SetStateAction<boolean>>
}

export const SectionRace = ({ showSectionRace }: PropsSectionRace) => {

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
    const { flags } = stateCountry;

    useEffect(() => {
        const response = getRace(`current/next`, setStateCountry)

        setTimeout(() => {
            response.then(value => {
                showSectionRace(value)
                setIsLoad(value)
            })

        }, 2000);
    }, []);

    return (
        <>
            {
                isLoad ? (
                    <Section title={RaceTable?.Races[0].raceName || ''} content={
                        <div className="relative grid grid-cols-2">
                            <div className="col-span-2 sm:col-span-1">
                                <div className="my-1">
                                    <div>{`${RaceTable?.Races[0].Circuit.circuitName}`}</div>
                                    <div>
                                        {`${RaceTable?.Races[0].Circuit.Location.locality}, ${RaceTable?.Races[0].Circuit.Location.country}`}
                                        <img className="inline-block mx-2 h-4 border-solid border-[1px] border-gray-900" src={flags.svg} alt={`${RaceTable?.Races[0].Circuit.Location.country}'s flag`} />
                                    </div>
                                </div>
                                <div>
                                    <b>FP1: </b>
                                    <FormatDate date={`${RaceTable?.Races[0].FirstPractice.date}`} time={`${RaceTable?.Races[0].FirstPractice.time}`} />
                                </div>
                                {
                                    (Object.keys(RaceTable?.Races[0].Sprint || {}).length) === 0 ? (
                                        <>
                                            <div>
                                                <b>FP2: </b>
                                                <FormatDate date={`${RaceTable?.Races[0].SecondPractice.date}`} time={`${RaceTable?.Races[0].SecondPractice.time}`} />
                                            </div>
                                            <div>
                                                <b>FP3: </b>
                                                <FormatDate date={`${RaceTable?.Races[0].ThirdPractice?.date}`} time={`${RaceTable?.Races[0].ThirdPractice?.time}`} />
                                            </div>
                                            <div>
                                                <b>Qualifying: </b>
                                                <FormatDate date={`${RaceTable?.Races[0].Qualifying.date}`} time={`${RaceTable?.Races[0].Qualifying.time}`} />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <b>Qualifying: </b>
                                                <FormatDate date={`${RaceTable?.Races[0].Qualifying.date}`} time={`${RaceTable?.Races[0].Qualifying.time}`} />
                                            </div>
                                            <div>
                                                <b>FP2: </b>
                                                <FormatDate date={`${RaceTable?.Races[0].SecondPractice.date}`} time={`${RaceTable?.Races[0].SecondPractice.time}`} />
                                            </div>
                                            <div>
                                                <b>Sprint: </b>
                                                <FormatDate date={`${RaceTable?.Races[0].Sprint?.date}`} time={`${RaceTable?.Races[0].Sprint?.time}`} />
                                            </div>
                                        </>
                                    )
                                }
                                <div>
                                    <b>Race: </b>
                                    <FormatDate date={`${RaceTable?.Races[0].date}`} time={`${RaceTable?.Races[0].time}`} />
                                </div>
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