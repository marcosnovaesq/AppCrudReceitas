import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { removeToken } from '../../../config/auth'
import UserContext from '../../../context/usercontext'
import './nav.css'

const Nav = () => {
    const history = useHistory()
    const { usuarioLogado, setUsuarioLogado } = useContext(UserContext)


    const changePage = (value) => {
        history.push(value)
    }

    const handleLogout = () => {
        removeToken()
        setUsuarioLogado({})
        changePage('/')
    }

    const geraLinks = () => {
        const usuario = usuarioLogado
        //nao ta logado
        if (Object.keys(usuario).length === 0) {
            return (
                <>
                    <button onClick={() => changePage('/users/create')} > Cadastre-se</button>
                    <button onClick={() => changePage('/login')} >Login</button>
                </>
            )
        }
        //ta logado, é admin
        else if (usuario.isAdmin) {
            return (
                <>
                    <button onClick={() => changePage('/recipes/create')} >Crie sua receita!</button>
                    <button onClick={() => changePage('/recipes')} >Todas as receitas</button>
                    <button onClick={() => changePage('/users')} >Usuários</button>
                    <button onClick={() => changePage(`/users/${usuario.id}`)} >Perfil</button>
                    <button onClick={() => handleLogout()} >Logout</button>
                </>
            )

        }
        //ta logado, nao é admin
        else {
            return (
                <>
                    <button onClick={() => changePage('/recipes/create')} >Crie sua receita!</button>
                    <button onClick={() => changePage('/recipes')} >Todas as receitas</button>
                    <button onClick={() => changePage(`/users/${usuario.id}`)} >Perfil</button>
                    <button onClick={() => handleLogout()} >Logout</button>
                </>
            )
        }

    }

    return (
        <div className="nav">
            {geraLinks()}
        </div>
    )

}

export default Nav