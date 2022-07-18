import axios from 'axios';

export default function apiF1DB( url: string ) {
    return axios.get(`https://ergast.com/api/f1/${url}.json`);
}