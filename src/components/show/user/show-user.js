import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../../service/user'
import Loading from '../../layout/loading/loading'
import './showuser.css'
import '../show.css'
const ShowUser = () => {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = useParams()


    const getShowUser = async (id) => {
        try {
            setLoading(true)
            const user = await getUserById(id)
            if (user.data.senha) {
                delete user.data.senha
            }
            setUser(user.data)
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            setUser({})
        }
    }

    const montaExibicaoUsuario = () => {
        return (
            <div className="divShow">
                <div className="divInfo">
                    <p><b>nome:</b> {user.nome}</p>
                    <p><b>telefone:</b> {user.telefone}</p>
                    <p><b>email:</b> {user.email}</p>
                </div>
            </div>
        )
    }


    useEffect(() => {
        getShowUser(id)
        return () => { }
    }, [id])

    return (
        <>
            {loading ? <Loading /> : montaExibicaoUsuario()}
        </>
    )
}

export default ShowUser