import { useState } from "react"
import apiCountriesDB from "../../api/CountriesDB"
import { Country } from "../../interfaces/CountriesInterfaces"
import { CountriesContext } from "./CountriesContext"


interface ProviderProps {
    children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: Country = {
    name: "",
    alpha3Code: "",
    timezones: [],
    flags: {
        svg: "",
        png: ""
    },
    independent: ""
}

export const CountriesProvider = ({children}: ProviderProps) => {
    const [stateCountry, setStateCountry] = useState(INITIAL_STATE);

    const getCountry = async ( query: string ) => {
        const response: any = await apiCountriesDB(`name/${query}?fields=name,alpha3Code,timezones,flags`);
        const data: Country = response.data[0];
        setStateCountry(data);
    }

    return(
        <CountriesContext.Provider value={{
            stateCountry,
            getCountry
        }}>
            {children}
        </CountriesContext.Provider>
    )
}