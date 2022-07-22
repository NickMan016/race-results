import axios from 'axios';

export default function apiF1DB( url: string, options: string = "" ) {
    return axios.get(`https://ergast.com/api/f1/${url}.json${options}`);
}