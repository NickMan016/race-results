import { useState } from "react"
import apiF1DB from "../../api/F1DB"
import { MRData } from "../../interfaces/F1Interfaces"
import { F1Context } from "./F1Context"
// import { F1Reducer } from "./F1Reducer"

interface ProviderProps {
    children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE_RACES: MRData = {
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

    // const [stateRaces, dispatch] = useReducer(F1Reducer, INITIAL_STATE_RACES);
    const [stateRaces, setStateRaces] = useState(INITIAL_STATE_RACES);

    const getResults = async ( query: string ) => {
        
        const response: any = await apiF1DB(query)
        const data: MRData = response.data.MRData;
        setStateRaces(data)        
    }

    return (
        <F1Context.Provider value={{
            stateRaces,
            getResults
        }}>
            {children}
        </F1Context.Provider>
    )
}