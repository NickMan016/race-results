import { Dispatch, SetStateAction, useContext, useState } from "react"
import { Country } from "../../interfaces/CountriesInterfaces"
import { MRData, DriverStanding } from "../../interfaces/F1Interfaces"
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
        season: '',
        StandingsLists: []
    },
    ConstructorTable: {
        Constructors: []
    },
    DriverTable: {
        season: '',
        constructorId: '',
        Drivers: []
    },
    CircuitTable: {
        season: '',
        Circuits: []
    }
}

const INITIAL_STATE_DRIVER_CHAMPION: DriverStanding = {
    position: "",
    positionText: "",
    points: "",
    wins: "",
    poles: "",
    fastestlaps: "",
    Driver: {
        driverId: "",
        permanentNumber: "",
        code: "",
        url: "",
        givenName: "",
        familyName: "",
        dateOfBirth: "",
        nationality: ""
    },
    Constructors: []
}

export const F1Provider = ({ children }: ProviderProps) => {

    // const [stateRaces, dispatch] = useReducer(F1Reducer, INITIAL_STATE);
    const [stateResults, setStateResults] = useState(INITIAL_STATE);
    const [stateQualifying, setStateQualifying] = useState(INITIAL_STATE);
    const [stateSprint, setStateSprint] = useState(INITIAL_STATE);
    const [stateRace, setStateRace] = useState(INITIAL_STATE);
    const [stateDriverStanding, setStateDriverStanding] = useState(INITIAL_STATE);
    const [stateConstructorStanding, setStateConstructorStanding] = useState(INITIAL_STATE);
    const [stateConstructors, setStateConstructors] = useState(INITIAL_STATE);
    const [stateDrivers, setStateDrivers] = useState(INITIAL_STATE);
    const [stateSchedule, setStateSchedule] = useState(INITIAL_STATE);
    const [stateInfoDriverChampion, setStateInfoDriverChampion] = useState(INITIAL_STATE_DRIVER_CHAMPION);
    const { getCountry } = useContext(CountriesContext);

    const getResults = async (query: string, setCountry: Dispatch<SetStateAction<Country>>) => {
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

    const getQualifying = async (query: string, setCountry: Dispatch<SetStateAction<Country>>) => {
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

    const getSprint = async (query: string, setCountry: Dispatch<SetStateAction<Country>>) => {
        try {
            const response: any = await apiF1DB(query)
            const data: MRData = await response.data.MRData;
            if (data.RaceTable?.Races.length === 0)
                return false
            else {
                setStateSprint(data)
                getCountry(data.RaceTable?.Races[0].Circuit.Location.country || '', setCountry)
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    const getRace = async (query: string, setCountry: Dispatch<SetStateAction<Country>>) => {
        try {
            const date = new Date();
            const response: any = await apiF1DB(query);
            const data: MRData = await response.data.MRData;
            if (data.RaceTable?.season !== date.getFullYear().toString()) {
                return false;
            } else {
                setStateRace(data);
                getCountry(data.RaceTable?.Races[0].Circuit.Location.country || '', setCountry);
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    const getRaceWithResults = async (query: string, setCountry: Dispatch<SetStateAction<Country>>) => {
        try {
            const date = new Date();
            const responseRace: any = await apiF1DB(query)
            const dataRace: MRData = await responseRace.data.MRData;
            
            if (dataRace.RaceTable?.season !== date.getFullYear().toString()) {
                const responseRace: any = await apiF1DB('current/last')
                const dataRace: MRData = await responseRace.data.MRData;

                const responseResults: any = await apiF1DB(`current/last/results`)
                const dataResults: MRData = await responseResults.data.MRData;

                setStateRace(dataRace);
                setStateResults(dataResults);
                getCountry(dataRace.RaceTable?.Races[0].Circuit.Location.country || '', setCountry);

                return true;
            } else {
                const responseResults: any = await apiF1DB(`${query}/results`)
                const dataResults: MRData = await responseResults.data.MRData;

                setStateRace(dataRace);
                setStateResults(dataResults);
                getCountry(dataRace.RaceTable?.Races[0].Circuit.Location.country || '', setCountry);

                return true;
            }
        } catch (error) {
            return false;
        }
    }

    const getDriverStanding = async (query: string) => {
        try {
            const response: any = await apiF1DB(query);
            const data: MRData = await response.data.MRData;
            setStateDriverStanding(data);
            return true;
        } catch (error) {
            return false;
        }
    }

    const getConstructorStanding = async (query: string) => {
        try {
            const response: any = await apiF1DB(query);
            const data: MRData = await response.data.MRData;
            setStateConstructorStanding(data);
            return true;
        } catch (error) {
            return false;
        }
    }

    const getConstructors = async (query: string) => {
        try {
            const response: any = await apiF1DB(query);
            const data: MRData = await response.data.MRData;
            setStateConstructors(data);
            return true;
        } catch (error) {
            return false;
        }
    }

    const getDrivers = async (query: string) => {
        try {
            const response: any = await apiF1DB(query);
            const data: MRData = await response.data.MRData;
            setStateDrivers(data);
            return true;
        } catch (error) {
            return false;
        }
    }

    const getSchedule = async (query: string) => {
        try {
            const response: any = await apiF1DB(query);
            const data: MRData = await response.data.MRData;
            setStateSchedule(data)
            return true;
        } catch (error) {
            return false;
        }
    }

    const getInfoDriverChampion = async () => {
        let responseSchedule: any = await apiF1DB('current');
        let dataSchedule: MRData = await responseSchedule.data.MRData;

        const dateLastRace = new Date(dataSchedule.RaceTable.Races[dataSchedule.RaceTable.Races.length - 1].date);
        dateLastRace.setDate(dateLastRace.getDate() + 7);
        
        responseSchedule = await apiF1DB(`${parseInt(dataSchedule.RaceTable.season) + 1}`);
        dataSchedule = await responseSchedule.data.MRData;

        if (dataSchedule.RaceTable.Races.length !== 0) {
            const dateNextRace = new Date(dataSchedule.RaceTable.Races[0].date);
            dateLastRace.setDate(dateNextRace.getDate() - 7);
            
            const date = new Date();
    
            if (date > dateLastRace && date < dateNextRace && (date.getFullYear().toString() === dataSchedule.RaceTable.season && dataSchedule.RaceTable.Races.length === 0)) {
                try {
                    const response: any = await apiF1DB('current/driverStandings');
                    const data: MRData = await response.data.MRData;
        
                    const dataDriver: DriverStanding = data.StandingsTable.StandingsLists[0].DriverStandings[0];
        
                    const responseQualifying: any = await apiF1DB(`current/drivers/${dataDriver.Driver.driverId}/qualifying`);
                    const dataQualifying: MRData = await responseQualifying.data.MRData;
                    const responseResults: any = await apiF1DB(`current/drivers/${dataDriver.Driver.driverId}/results`);
                    const dataResults: MRData = await responseResults.data.MRData;
                    let podiums = 0, fastestlaps = 0;
                    for (let index = 0; index < dataQualifying.RaceTable.Races.length; index++) {
                        if (dataQualifying.RaceTable.Races[index].QualifyingResults[0].position === "1")
                            podiums++;
                    }
                    for (let index = 0; index < dataResults.RaceTable.Races.length; index++) {
                        if (dataResults.RaceTable.Races[index].Results[0].FastestLap.rank === "1")
                            fastestlaps++;
                    }
                    dataDriver.poles = podiums.toString();
                    dataDriver.fastestlaps = fastestlaps.toString();
                    setStateInfoDriverChampion(dataDriver);
        
                    return true;
                } catch (error) {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }

    }

    return (
        <F1Context.Provider value={{
            stateResults,
            stateQualifying,
            stateSprint,
            stateRace,
            stateDriverStanding,
            stateConstructorStanding,
            stateConstructors,
            stateDrivers,
            stateSchedule,
            stateInfoDriverChampion,
            getRaceWithResults,
            getResults,
            getQualifying,
            getSprint,
            getRace,
            getDriverStanding,
            getConstructorStanding,
            getConstructors,
            getDrivers,
            getSchedule,
            getInfoDriverChampion
        }}>
            {children}
        </F1Context.Provider>
    )
}