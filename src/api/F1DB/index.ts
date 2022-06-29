import axios from 'axios';

export default async function apiF1DB( url: string ) {
    try {
        const response = await axios.get(`http://ergast.com/api/f1/${url}`);

        return response;
    } catch (error) {
        Promise.reject(error);
    }
}