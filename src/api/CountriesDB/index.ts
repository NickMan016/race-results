import axios from 'axios';

export default async function apiCountriesDB( url: string ) {
    try {
        const response = await axios.get(`https://restcountries.com/v2/${url}?fields=name,alpha3Code,altSpellings,region,capital,timezones,flags`);

        return response;
    } catch (error) {
        Promise.reject(error);
    }
}