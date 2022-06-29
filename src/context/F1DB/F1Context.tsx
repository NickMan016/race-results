import { createContext } from "react";
import { MRData } from "../../interfaces/F1Interfaces";

export type F1ContextProps = {
    stateRaces: MRData,
    getResults: ( query: string ) => void
}

export const F1Context = createContext<F1ContextProps>({} as F1ContextProps);