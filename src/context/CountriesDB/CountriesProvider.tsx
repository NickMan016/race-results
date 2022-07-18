import { Dispatch, SetStateAction } from "react"
import apiCountriesDB from "../../api/CountriesDB"
import { Country } from "../../interfaces/CountriesInterfaces"
import { CountriesContext } from "./CountriesContext"


interface ProviderProps {
    children: JSX.Element | JSX.Element[]
}

export const CountriesProvider = ({ children }: ProviderProps) => {

    const getCountry = async (query: string, setCountry: Dispatch<SetStateAction<Country>>) => {
        try {
            const response: any = await apiCountriesDB(`name/${query}`);
            const data: Country[] = await response.data;
    
            if (data.length === 1) {
                setCountry(data[0]);
            } else {
                data.map((value) => {
                    for (let index = 0; index < value.altSpellings.length; index++) {
                        const element = value.altSpellings[index];
                        if (element === "UK") {
                            setCountry(value);
                        }
                    }
                    return;
                });
            }
        } catch (error) {
            
        }
    }

    return (
        <CountriesContext.Provider value={{
            getCountry
        }}>
            {children}
        </CountriesContext.Provider>
    )
}