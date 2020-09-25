import React, { useState, useEffect } from 'react'
import { listUser, deleteUser } from '../../../service/user'
import { booleanToString, formataStringTamanho, conteudoVazio } from '../../../helpers/dataHelper'
import Loading from '../../layout/loading/loading'
import { useHistory } from 'react-router-dom'
import '../list.css'
const ListUser = () => {
    const [users, setUsers] = useState([])
    const history = useHistory()
    const [loading, setLoading] = useState(false)


    const getUserList = async () => {
        try {
            setLoading(true)
            const userList = await listUser()
            setUsers(userList.data)
            setLoading(false)
        } catch (error) {
            setUsers([])
            setLoading(false)
            console.log(error.response.data.erro)
        }
    }

    const handleDelete = async (user) => {
        if (window.confirm(`tem certeza que deseja deletar o usuario ${user.nome}?`)) {
            try {
                await deleteUser(user)
                getUserList()
            } catch (error) {
                alert('erro ao deletar usuario')
            }
        }
    }

    const handleShow = (user) => {
        history.push(`/users/${user._id}`)
    }

    const handleEdit = (user) => {
        history.push(`/users/edit/${user._id}`)
    }

    const mudaPage = () => {
        history.push('/users/create')
    }

    const montaLinhasTabela = () => {
        return users.map((user, index) => (
            <tr className="linhaTabela" key={index} onClick={() => handleShow(user)}>
                <td className="tdTabela" >{formataStringTamanho(user.nome)}</td>
                <td className="tdTabela" >{formataStringTamanho(user.email)}</td>
                <td className="tdTabela" >{user.telefone}</td>
                <td className="tdTabela" >{booleanToString(user.isActive)}</td>
                <td className="tdTabela" >{booleanToString(user.isAdmin)}</td>
                <td className="tdTabela" ><span><button onClick={() => handleShow(user)}>Exibir</button></span> | <span><button onClick={() => handleEdit(user)}>Editar</button></span> |<span> <button onClick={() => handleDelete(user)}>Excluir</button></span></td>
            </tr>
        ))

    }

    const montaTabela = () => {
        return (
            <div>
                {users.length > 0 ?
                    <table border="1">
                        <thead>
                            <tr>
                                <th>nome</th>
                                <th>email</th>
                                <th>telefone</th>
                                <th>Ativo</th>
                                <th>Admin</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {montaLinhasTabela()}
                        </tbody>
                    </table>
                    : conteudoVazio("usuarios")}


            </div>
        )
    }

    useEffect(() => {
        getUserList()
    }, [])

    return (
        <div id="table">
            <nav>
                <div className="title"> Lista de Usuários</div>
                <div className="action">
                    <button onClick={() => mudaPage()} > + Novo</button>
                </div>
            </nav>
            {loading ? <Loading></Loading> : montaTabela()}
        </div>
    )
}

export default ListUser