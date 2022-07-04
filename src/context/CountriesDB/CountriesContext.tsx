import { createContext, Dispatch, SetStateAction } from "react";
import { Country } from "../../interfaces/CountriesInterfaces";

export type CountriesContextProps = {
    getCountry: ( query: string, setCountry: Dispatch<SetStateAction<Country>> ) => void
}

export const CountriesContext = createContext<CountriesContextProps>({} as CountriesContextProps);