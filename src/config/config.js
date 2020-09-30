import axios from 'axios'
import { getToken } from './auth'

const clientHTTP = axios.create({
    baseURL: `https://bootcamp-app-receitas.herokuapp.com`
    // baseURL: `http://localhost:3001`
})

clientHTTP.defaults.headers.post['Content-Type'] = 'application/json';


if (getToken()) {
    clientHTTP.defaults.headers['x-auth-token'] = getToken();
}

export {
    clientHTTP
}