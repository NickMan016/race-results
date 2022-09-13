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
    }
}

export const F1Provider = ({ children }: ProviderProps) => {

    // const [stateRaces, dispatch] = useReducer(F1Reducer, INITIAL_STATE);
    const [stateResults, setStateResults] = useState(INITIAL_STATE);
    const [stateQualifying, setStateQualifying] = useState(INITIAL_STATE);
    const [stateRace, setStateRace] = useState(INITIAL_STATE);
    const [stateDriverStanding, setStateDriverStanding] = useState(INITIAL_STATE);
    const [stateConstructorStanding, setStateConstructorStanding] = useState(INITIAL_STATE);
    const [stateConstructors, setStateConstructors] = useState(INITIAL_STATE);
    const [stateDrivers, setStateDrivers] = useState(INITIAL_STATE);
    const [stateSchedule, setStateSchedule] = useState(INITIAL_STATE);
    const { getCountry } = useContext(CountriesContext);

    const getResults = async ( query: string, setCountry: Dispatch<SetStateAction<Country>> ) => {
        try {
            const response: any = await apiF1DB(query)
            const data: MRData = await response.data.MRData;
            setStateResults(data)
            getCountry(data.RaceTable?.Races[0].Circuit.Location.country || '', setCountry)
            return true;
        } catch (error) {
            return false;
        }
    }

    const getQualifying = async ( query: string, setCountry: Dispatch<SetStateAction<Country>> ) => {
        try {
            const response: any = await apiF1DB(query)
            const data: MRData = await response.data.MRData;
            if (data.RaceTable?.Races.length === 0)
                return false
            else {
                setStateQualifying(data)
                getCountry(data.RaceTable?.Races[0].Circuit.Location.country || '', setCountry)
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    const getRace = async ( query: string, setCountry: Dispatch<SetStateAction<Country>> ) => {
        try {
            const response: any = await apiF1DB(query);
            const data: MRData = await response.data.MRData;
            setStateRace(data);
            getCountry(data.RaceTable?.Races[0].Circuit.Location.country || '', setCountry);
            return true;
        } catch (error) {
            return false;
        }
    }

    const getRaceWithResults = async ( query: string, setCountry: Dispatch<SetStateAction<Country>> ) => {
        try {
            const responseRace: any = await apiF1DB(query)
            const dataRace: MRData = await responseRace.data.MRData;
            
            const responseResults: any = await apiF1DB(`${query}/results`)
            const dataResults: MRData = await responseResults.data.MRData;
                        
            setStateRace(dataRace);
            setStateResults(dataResults);
            getCountry(dataRace.RaceTable?.Races[0].Circuit.Location.country || '', setCountry);
            return true;
        } catch (error) {
            return false;
        }
    }

    const getDriverStanding = async ( query: string ) => {
        try {
            const response: any = await apiF1DB(query);
            const data: MRData = await response.data.MRData;
            setStateDriverStanding(data);
            return true;
        } catch (error) {
            return false;
        }
    }

    const getConstructorStanding = async ( query: string ) => {
        try {
            const response: any = await apiF1DB(query);
            const data: MRData = await response.data.MRData;
            setStateConstructorStanding(data);
            return true;
        } catch (error) {
            return false;
        }
    }

    const getConstructors = async ( query: string ) => {
        try {
            const response: any = await apiF1DB(query);
            const data: MRData = await response.data.MRData;
            setStateConstructors(data);
            return true;
        } catch (error) {
            return false;
        }
    }

    const getDrivers = async ( query: string ) => {
        try {
            const response: any = await apiF1DB(query);
            const data: MRData = await response.data.MRData;
            setStateDrivers(data);
            return true;
        } catch (error) {
            return false;
        }
    }

    const getSchedule = async ( query: string ) => {
        try {
            const response: any = await apiF1DB(query);
            const data: MRData = await response.data.MRData;
            setStateSchedule(data)
            return true;
        } catch (error) {
            return false;
        }
    }

    return (
        <F1Context.Provider value={{
            stateResults,
            stateQualifying,
            stateRace,
            stateDriverStanding,
            stateConstructorStanding,
            stateConstructors,
            stateDrivers,
            stateSchedule,
            getRaceWithResults,
            getResults,
            getQualifying,
            getRace,
            getDriverStanding,
            getConstructorStanding,
            getConstructors,
            getDrivers,
            getSchedule
        }}>
            {children}
        </F1Context.Provider>
    )
}