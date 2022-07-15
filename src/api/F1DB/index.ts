import axios from 'axios';

export default async function apiF1DB( url: string ) {
    try {
        const response = await axios.get(`https://ergast.com/api/f1/${url}.json`);

        return response;
    } catch (error) {
        console.log(error);
    }
}