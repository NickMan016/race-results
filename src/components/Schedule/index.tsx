import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fa1, fa2, fa3, faCalendarDays, faChevronCircleLeft, faChevronCircleRight, faClock, faP, faRankingStar, } from "@fortawesome/free-solid-svg-icons"
import { Section } from "../Section"
import { MouseEvent, useContext, useEffect, useState } from "react"
import { F1Context } from "../../context/F1DB/F1Context"
import { Country } from "../../interfaces/CountriesInterfaces"
import { SectionScheduleLoading } from "../Section/components/SectionScheduleLoading"
import { FormatDate } from "../../hooks/FormatDate"

export const Schedule = () => {

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
    const { stateSchedule, stateRace, stateResults, getSchedule, getRaceWithResults } = useContext(F1Context);
    const [stateCountry, setStateCountry] = useState(INITIAL_STATE);
    const { RaceTable } = stateRace;
    const { flags, region, capital } = stateCountry

    useEffect(() => {
        getSchedule(`current`)
        const response = getRaceWithResults(`current/next`, setStateCountry)

        setTimeout(() => {
            response.then(value => setIsLoad(value))
        }, 2000);
    }, [])

    const handleChangeRound = (e: MouseEvent<HTMLButtonElement>) => {
        const button: HTMLButtonElement = e.currentTarget;
        const { name } = button;

        setIsLoad(false)
        let responseRace: Promise<boolean>;
        if (name === '+') {
            responseRace = getRaceWithResults(`current/${parseInt(RaceTable?.round || '1') + 1}`, setStateCountry)
        } else {
            responseRace = getRaceWithResults(`current/${parseInt(RaceTable?.round || '1') - 1}`, setStateCountry)
        }

        setTimeout(() => {
            responseRace.then(value => setIsLoad(value))
        }, 2000);
    }

    return (
        <>
            <div className="mt-[5.25rem] mb-10 relative">
                {
                    isLoad ? (
                        <Section title="Current Season Schedule" content={
                            <>
                                <div className="mt-1 relative sm:absolute sm:z-50 sm:right-3 sm:top-2">
                                    <span className="text-lg">{RaceTable?.Races[0].raceName}</span>
                                    <div className="absolute right-0 top-1 sm:static sm:inline-block">
                                        <button onClick={handleChangeRound} name="-" className={`mx-3 ${RaceTable?.round === '1' ? 'cursor-not-allowed disabled:opacity-50' : ''}`} disabled={RaceTable?.round === '1' ? true : false}><FontAwesomeIcon className="text-xl" icon={faChevronCircleLeft} /></button>
                                        <button onClick={handleChangeRound} name="+" className={RaceTable?.round === stateSchedule.total ? 'cursor-not-allowed disabled:opacity-50' : ''} disabled={RaceTable?.round === stateSchedule.total ? true : false}><FontAwesomeIcon className="text-xl" icon={faChevronCircleRight} /></button>
                                    </div>
                                </div>
                                <div className="relative grid grid-cols-2 items-center justify-center">
                                    {
                                        stateResults.RaceTable?.Races.length === 0 ? (
                                            <div className="col-span-2 sm:col-span-1">
                                                <div className="text-lg">
                                                    <div className="sm:inline-block">{`${RaceTable?.Races[0].Circuit.circuitName}`}</div>
                                                    <div className="hidden sm:inline-block">&nbsp;|&nbsp;</div>
                                                    <div className="sm:inline-block">
                                                        {`${RaceTable?.Races[0].Circuit.Location.locality}, ${RaceTable?.Races[0].Circuit.Location.country}`}
                                                        <img className="inline-block mx-2 h-4 border-solid border-[1px] border-gray-900" src={flags.svg} alt={`${RaceTable?.Races[0].Circuit.Location.country}'s flag`} />
                                                    </div>
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
                                        ) : (
                                            <div className="col-span-2 sm:col-span-1">
                                                <div className="mt-0 sm:mt-1">
                                                    <div className="sm:inline-block">{`${RaceTable?.Races[0].Circuit.circuitName}`}</div>
                                                    <div className="hidden sm:inline-block">&nbsp;|&nbsp;</div>
                                                    <div className="sm:inline-block">
                                                        {`${RaceTable?.Races[0].Circuit.Location.locality}, ${RaceTable?.Races[0].Circuit.Location.country}`}
                                                        <img className="inline-block mx-2 h-4 border-solid border-[1px] border-gray-900" src={flags.svg} alt={`${RaceTable?.Races[0].Circuit.Location.country}'s flag`} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-0">
                                                    <div className=" col-span-2 sm:col-span-1">
                                                        {
                                                            stateResults.RaceTable?.Races[0].Results?.map((value, index) => {
                                                                if (index <= 2) {
                                                                    let icon;
                                                                    if (index === 0) {
                                                                        icon = <FontAwesomeIcon className="text-[2.5rem]" icon={fa1} />;
                                                                    } else if (index === 1) {
                                                                        icon = <FontAwesomeIcon className="text-[2.5rem]" icon={fa2} />;
                                                                    } else if (index === 2) {
                                                                        icon = <FontAwesomeIcon className="text-[2.5rem]" icon={fa3} />;
                                                                    }
                                                                    return (
                                                                        <div className="my-2 flex items-center" key={index}>
                                                                            <div className="mr-4 w-6">{icon}</div>
                                                                            <div className="mr-4">
                                                                                <img className="h-10 w-10 rounded-full" src={require(`./../../assets/img/drivers/${value.Driver.driverId}.png`)} alt={`Foto de ${value.Driver.driverId}`} />
                                                                            </div>
                                                                            <div className="mr-4 w-20">
                                                                                <div>{value.Driver.givenName}</div>
                                                                                <div>{value.Driver.familyName}</div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                    <div className=" col-span-2 sm:col-span-1">
                                                        {
                                                            stateResults.RaceTable?.Races[0].Results?.map((value, index) => {
                                                                if (value.grid === '1') {
                                                                    return (
                                                                        <div className="my-2 flex items-center" key={index}>
                                                                            <div className="bg-[#EE0000] w-6 h-6 mr-4 flex items-center justify-center rounded"><FontAwesomeIcon className="" icon={faP} /></div>
                                                                            <div className="mr-4">
                                                                                <img className="h-10 w-10 rounded-full" src={require(`./../../assets/img/drivers/${value.Driver.driverId}.png`)} alt={`Foto de ${value.Driver.driverId}`} />
                                                                            </div>
                                                                            <div className="mr-4 w-20">
                                                                                <div>{value.Driver.givenName}</div>
                                                                                <div>{value.Driver.familyName}</div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                        {
                                                            stateResults.RaceTable?.Races[0].Results?.map((value, index) => {
                                                                if (value.FastestLap?.rank === '1') {
                                                                    return (
                                                                        <div className="my-2 flex items-center" key={index}>
                                                                            <div className="bg-fuchsia-600 w-6 h-6 mr-4 flex items-center justify-center rounded"><FontAwesomeIcon className="text-white" icon={faClock} /></div>
                                                                            <div className="mr-4">
                                                                                <img className="h-10 w-10 rounded-full" src={require(`./../../assets/img/drivers/${value.Driver.driverId}.png`)} alt={`Foto de ${value.Driver.driverId}`} />
                                                                            </div>
                                                                            <div className="mr-4 w-20">
                                                                                <div>{value.Driver.givenName}</div>
                                                                                <div>{value.Driver.familyName}</div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className="col-span-2 sm:col-span-1">
                                        <img className="block mt-4 mx-auto h-[140px] sm:mt-0" src={require(`./../../assets/img/circuits/${RaceTable?.Races[0].Circuit.circuitId}.png`)} alt="" />
                                    </div>
                                </div>
                            </>
                        } />
                    ) : (
                        <SectionScheduleLoading />
                    )
                }
            </div>
        </>
    )
}