import { Dispatch, SetStateAction, useContext, useState } from "react"
import { Country } from "../../interfaces/CountriesInterfaces"
import { MRData } from "../../interfaces/F1Interfaces"
import { F1Context } from "./F1Context"
import { CountriesContext } from "../CountriesDB/CountriesContext"
import apiF1DB from "../../api/F1DB"

interface ProviderProps {
    children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: MRData = {
    xmlns: "",
    series: "",
    url: "",
    limit: "",
    offset: "",
    total: "",
    RaceTable: {
        season: "",
        round: "",
        Races: []
    },
    StandingsTable: {
        season: "",
        StandingsLists: []
    }
}

export const F1Provider = ({ children }: ProviderProps) => {

    // const [stateRaces, dispatch] = useReducer(F1Reducer, INITIAL_STATE);
    const [stateResults, setStateResults] = useState(INITIAL_STATE);
    const [stateRace, setStateRace] = useState(INITIAL_STATE);
    const [stateDriverStanding, setStateDriverStanding] = useState(INITIAL_STATE);
    const [stateConstructorStanding, setStateConstructorStanding] = useState(INITIAL_STATE);
    const { getCountry } = useContext(CountriesContext);

    const getResults = async ( query: string, setCountry: Dispatch<SetStateAction<Country>> ) => {
        const response: any = await apiF1DB(query)
        const data: MRData = response.data.MRData;
        setStateResults(data)
        getCountry(data.RaceTable?.Races[0].Circuit.Location.country || '', setCountry)
    }

    const getRace = async ( query: string, setCountry: Dispatch<SetStateAction<Country>> ) => {
        const response: any = await apiF1DB(query);
        const data: MRData = response.data.MRData;
        setStateRace(data);
        getCountry(data.RaceTable?.Races[0].Circuit.Location.country || '', setCountry);
    }

    const getDriverStanding = async ( query: string ) => {
        const response: any = await apiF1DB(query);
        const data: MRData = response.data.MRData;
        setStateDriverStanding(data);
    }

    const getConstructorStanding = async ( query: string ) => {
        const response: any = await apiF1DB(query);
        const data: MRData = response.data.MRData;
        setStateConstructorStanding(data);
    }

    return (
        <F1Context.Provider value={{
            stateResults,
            stateRace,
            stateDriverStanding,
            stateConstructorStanding,
            getResults,
            getRace,
            getDriverStanding,
            getConstructorStanding
        }}>
            {children}
        </F1Context.Provider>
    )
}