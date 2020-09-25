import { clientHTTP } from '../config/config'
import { saveToken } from '../config/auth';


const login = (data) => clientHTTP.post('/auth', data)


const processoLogin = async (form) => {
    const { data: { token, user } } = await login(form)
    clientHTTP.defaults.headers['x-auth-token'] = token;
    saveToken(token)
    return user;
}


export {
    login,
    processoLogin
}