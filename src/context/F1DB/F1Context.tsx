import { createContext, Dispatch, SetStateAction } from "react";
import { Country } from "../../interfaces/CountriesInterfaces";
import { MRData } from "../../interfaces/F1Interfaces";

export type F1ContextProps = {
    stateResults: MRData,
    stateRace: MRData,
    stateDriverStanding: MRData,
    stateConstructorStanding: MRData,
    getResults: ( query: string, setCountry: Dispatch<SetStateAction<Country>> ) => void,
    getRace: ( query: string, setCountry: Dispatch<SetStateAction<Country>> ) => void,
    getDriverStanding: ( query: string ) => void,
    getConstructorStanding: ( query: string ) => void
}

export const F1Context = createContext<F1ContextProps>({} as F1ContextProps);