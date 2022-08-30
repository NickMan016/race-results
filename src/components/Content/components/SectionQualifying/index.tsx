import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { F1Context } from "../../../../context/F1DB/F1Context";
import { Country } from "../../../../interfaces/CountriesInterfaces";
import { QualifyingResult } from "../../../../interfaces/F1Interfaces";
import { Section } from "../../../Section";
import { SectionLoading } from "../../../Section/components/SectionLoading";
import { TableData } from "../../../TableData";

interface PropsSectionQualifying {
    showSectionQualifying: Dispatch<SetStateAction<boolean>>
}

export const SectionQualifying = ({ showSectionQualifying }: PropsSectionQualifying) => {

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
    const { stateQualifying, getQualifying } = useContext(F1Context);
    const [stateCountry, setStateCountry] = useState(INITIAL_STATE);
    const { RaceTable } = stateQualifying;
    const { flags } = stateCountry;

    useEffect(() => {
        const response = getQualifying('current/next/qualifying', setStateCountry);

        setTimeout(() => {
            response.then(value => {
                showSectionQualifying(value)
                setIsLoad(value)
            })
        }, 2000);
    }, [])

    return (
        <>
            {
                isLoad ? (
                    <Section title="Result of Current Qualifying" content={
                        <div className="text-lg">
                            <div className="mb-1">
                                {`${RaceTable?.Races[0].Circuit.circuitName} - ${RaceTable?.Races[0].Circuit.Location.locality}, ${RaceTable?.Races[0].Circuit.Location.country}`}
                                <img className="inline-block mx-2 h-4" src={flags.svg} alt={`${RaceTable?.Races[0].Circuit.Location.country}'s flag`} />
                            </div>
                            <TableData tHead={[
                                { text: 'Pos.', center: true },
                                { text: 'Driver', center: false },
                                { text: 'Team', center: false },
                                { text: 'Q1', center: true },
                                { text: 'Q2', center: true },
                                { text: 'Q3', center: true }
                            ]} tBody={
                                <tbody>
                                    {RaceTable?.Races[0].QualifyingResults?.map((value: QualifyingResult, index) => {
                                        return (
                                            <tr className="border-gray-700 border-b-[1px] hover:bg-gray-300 dark:border-gray-500 dark:hover:bg-gray-700" key={index}>
                                                <td className="p-2 text-center">{value.position}</td>
                                                <td className="p-2 ">{`${value.Driver.givenName} ${value.Driver.familyName}`}</td>
                                                <td className="p-2 ">{value.Constructor.name}</td>
                                                <td className="p-2 text-center">{value.Q1}</td>
                                                <td className="p-2 text-center">{value.Q2 === undefined ? 'No Time' : value.Q2}</td>
                                                <td className="p-2 text-center">{value.Q3 === undefined ? 'No Time' : value.Q3}</td>
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