import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { F1Context } from "../../../../context/F1DB/F1Context"
import { Country } from "../../../../interfaces/CountriesInterfaces"
import { Section } from "../../../Section"
import { SectionLoading } from "../../../Section/components/SectionLoading"
import { TableData } from "../../../TableData"


interface PropsSectionSprint {
    showSectionSprint: Dispatch<SetStateAction<boolean>>
}

export const SectionSprint = ({ showSectionSprint }: PropsSectionSprint) => {

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
    const { stateSprint, getSprint } = useContext(F1Context);
    const [stateCountry, setStateCountry] = useState(INITIAL_STATE);
    const { RaceTable } = stateSprint;
    const { flags } = stateCountry;

    useEffect(() => {
        const response = getSprint('current/next/sprint', setStateCountry);

        setTimeout(() => {
            response.then(value => {
                showSectionSprint(value)
                setIsLoad(value)
            })
        }, 2000);
    }, [])

    return (
        <>
            {
                isLoad ? (
                    <Section title={`${RaceTable?.Races[0].raceName} Sprint`} content={
                        <div>
                            <div className="text-lg">
                                <div className="sm:inline-block">{`${RaceTable?.Races[0].Circuit.circuitName}`}</div>
                                <div className="hidden sm:inline-block">&nbsp;|&nbsp;</div>
                                <div className="sm:inline-block">
                                    {`${RaceTable?.Races[0].Circuit.Location.locality}, ${RaceTable?.Races[0].Circuit.Location.country}`}
                                    <img className="inline-block mx-2 h-4 border-solid border-[1px] border-gray-900" src={flags.svg} alt={`${RaceTable?.Races[0].Circuit.Location.country}'s flag`} />
                                </div>
                            </div>
                            <div className="mb-1">
                                <span className="mr-4">
                                    <FontAwesomeIcon icon={faCircle} className="mr-2 text-green-600" />
                                    Finished
                                </span>
                                <span className="mr-4">
                                    <FontAwesomeIcon icon={faCircle} className="mr-2 text-red-600" />
                                    DNF
                                </span>
                            </div>
                            <TableData tHead={[
                                { text: 'Pos.', center: true },
                                { text: 'Driver', center: false },
                                { text: 'Team', center: false },
                                { text: 'Time', center: false },
                                { text: 'Status', center: true },
                                { text: 'Points', center: true }
                            ]} tBody={
                                <tbody>
                                    {RaceTable?.Races[0].SprintResults?.map((value, index) => {
                                        let status, time;

                                        if (value.status === 'Finished' || value.status === '+1 Lap' || value.status === '+2 Laps' || value.status === '+3 Laps' || value.status === '+4 Laps' || value.status === '+5 Laps' || value.status === '+6 Laps' || value.status === '+7 Laps' || value.status === '+8 Laps' || value.status === '+9 Laps') {
                                            status = <FontAwesomeIcon icon={faCircle} className="text-green-600" />;
                                            time = value.Time?.time || value.status;
                                        } else {
                                            status = <FontAwesomeIcon icon={faCircle} className="text-red-600" />;
                                            time = 'No Time'
                                        }
                                        return (
                                            <tr className="border-gray-700 border-b-[1px] hover:bg-gray-300 dark:border-gray-500 dark:hover:bg-gray-700" key={index}>
                                                <td className="p-2 text-center">{value.position}</td>
                                                <td className="p-2 ">{`${value.Driver.givenName} ${value.Driver.familyName}`}</td>
                                                <td className="p-2 ">{value.Constructor.name}</td>
                                                <td className="p-2 ">{time}</td>
                                                <td className="p-2 text-center">{status}</td>
                                                <td className="p-2 text-center">{value.points}</td>
                                            </tr>
                                        )
                                    })}
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