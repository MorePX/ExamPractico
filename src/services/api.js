import axios from 'axios';

const API_URL = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

export default API_URL;
