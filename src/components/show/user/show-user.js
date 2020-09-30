import React, { useEffect, useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { getUserById } from '../../../service/user'
import { listRecipesByUser } from '../../../service/recipe'
import Loading from '../../layout/loading/loading'
import './showuser.css'
import '../show.css'
import { capitalize } from '../../../helpers/dataHelper'
const ShowUser = (props) => {

    const [user, setUser] = useState({})
    const history = useHistory()
    const [userRecipes, setUserRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    console.log(props)

    const getShowUser = async (id) => {
        try {
            const user = await getUserById(id)
            if (user.data.senha) {
                delete user.data.senha
            }
            setUser(user.data)
        } catch (error) {
            console.log(error.message)
            setUser({})
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
                                        <Link className="linkItem btnItem" to={{ pathname: `recipes/${value._id}` }} >
                                            {value.nome}
                                        </Link>
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
        </>
    )
}

export default ShowUser