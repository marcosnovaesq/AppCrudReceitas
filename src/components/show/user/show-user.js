import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getUserById } from '../../../service/user'
import { listRecipesByUser } from '../../../service/recipe'
import './showuser.css'
import '../show.css'
import { capitalize } from '../../../helpers/dataHelper'
import Loading from '../../layout/loading/loading'
const ShowUser = () => {

    const [user, setUser] = useState({})
    const history = useHistory()
    const [userRecipes, setUserRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    const getShowUser = async (id) => {
        try {
            const user = await getUserById(id)
            if (user.data.senha) {
                delete user.data.senha
            }
            setUser(user.data)
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            setUser({})
            setLoading(false)
        }
    }

    const getUserRecipes = async (id) => {
        try {
            const recipes = await listRecipesByUser(id)
            setUserRecipes(recipes.data)
        } catch (error) {
            console.log(error.message)
            setUserRecipes([])
        }
    }

    const changePage = (id) => {
        history.push(`/recipes/${id}`)
    }


    const montaExibicaoUsuario = () => {
        return (
            <>
                {Object.keys(user).length === 0 ? <h1>usuario nao encontrado :(</h1> :
                    <div className="divShow">
                        <div className="divInfo">
                            <p><b>Nome:</b> {capitalize(user.nome)}</p>
                            <p><b>Telefone:</b> {user.telefone}</p>
                            <p><b>Email:</b> {user.email}</p>
                            <p><b>Receitas:</b></p>
                            <ul className="listshow">
                                {userRecipes.map((value, index) => {
                                    return <li className="liShow" key={index}>
                                        <button className="linkItem btnItem" onClick={() => changePage(value._id)}>
                                            {value.nome}
                                        </button>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                }
            </>
        )
    }


    useEffect(() => {
        const montaInfosUsuario = (id) => {
            try {
                setLoading(true)
                getShowUser(id)
                getUserRecipes(id)
                setLoading(false)
            } catch (error) {
                console.log(error.message)
                setLoading(false)
            }
        }
        montaInfosUsuario(id)
        return () => { }
    }, [id])

    return (
        <>
            {loading ? <Loading /> : montaExibicaoUsuario()}

            {/* <Loading /> */}
        </>
    )
}

export default ShowUser