import axios from 'axios';

export default function apiCountriesDB( url: string ) {
        return axios.get(`https://restcountries.com/v2/${url}?fields=name,alpha3Code,altSpellings,region,capital,timezones,flags`);
}