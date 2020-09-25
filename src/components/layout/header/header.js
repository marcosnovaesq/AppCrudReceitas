import React from 'react'
import logoFarofa from '../../../assets/img/default2.svg'
import { useHistory } from 'react-router-dom'
// import { isAuthenticated, removeToken } from '../../../config/auth'
import Nav from '../nav/nav'
import './header.css'


const Header = () => {
    const history = useHistory()
    const changePage = (value) => {
        history.push(value)
    }

    // const handleLogout = () => {
    //     if (isAuthenticated()) {
    //         removeToken()
    //         changePage('/')
    //     }
    //     else {
    //         alert('voce nem ta logado pow')
    //         changePage('/login')
    //     }

    // }




    return (
        <header>
            <div className="logo">
                <img onClick={() => changePage('/')} src={logoFarofa} alt="logo da farofinha" />
            </div>
            <div className="menu">
                <div className="search">
                    <input type="search" name="search" id="search" placeholder="Procure aqui a receita!" />
                    <button type="submit"><i className="fa fa-search"></i></button>
                </div>
                <Nav />
            </div>

        </header>
    )



}

export default Header