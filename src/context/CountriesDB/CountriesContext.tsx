import { createContext } from "react";
import { Country } from "../../interfaces/CountriesInterfaces";

export type CountriesContextProps = {
    stateCountry: Country,
    getCountry: ( query: string ) => void
}

export const CountriesContext = createContext<CountriesContextProps>({} as CountriesContextProps);