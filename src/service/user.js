import { clientHTTP } from '../config/config'

const createUser = (data) => clientHTTP.post('/users/new', data)

const listUser = () => clientHTTP.get('/users')

const deleteUser = (user) => clientHTTP.delete(`/users/${user.email}`)

const editUser = () => console.log('uahuahdu')

const getUserById = (id) => clientHTTP.get(`/users/${id}`)

const updateUser = (user) => clientHTTP.put(`/users/${user._id}`, user)

export {
    createUser,
    listUser,
    deleteUser,
    editUser,
    getUserById,
    updateUser
}