const TOKEN_KEY = 'x-auth-token'


const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}


const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}



const isAuthenticated = () => {
    return getToken() !== null
}


export {
    isAuthenticated,
    getToken,
    saveToken,
    removeToken
}