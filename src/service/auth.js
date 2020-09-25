import { clientHTTP } from '../config/config'
import { isAuthenticated, getToken } from '../config/auth'
import jwt from 'jsonwebtoken'

const login = (data) => clientHTTP.post('/auth', data)

const loggedUser = async () => {
    try {
        if (isAuthenticated()) {
            const { user } = await jwt.decode(getToken())
            return user
        }
        else {
            return {}
        }

    } catch (error) {
        console.log(error, 'erro na decodificaçao do usuario')
        return {}
    }
}

export {
    login,
    loggedUser
}