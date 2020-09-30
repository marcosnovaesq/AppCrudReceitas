import React, { useState, useEffect, useContext } from 'react'
import { listRecipe, deleteRecipe } from '../../../service/recipe';
import Loading from '../../layout/loading/loading'
import { mapeiaDificuldade, formataStringTamanho, conteudoVazio } from '../../../helpers/dataHelper'
import { useHistory } from 'react-router-dom'
import UserContext from '../../../context/usercontext'
import '../list.css'
const ListReceitas = () => {

    const [receitas, setReceitas] = useState([])
    const [loading, setLoading] = useState(false)
    const { usuarioLogado } = useContext(UserContext)
    const history = useHistory()


    const getRecipeList = async () => {
        try {
            setLoading(true)
            const list = await listRecipe()
            setReceitas(list.data)
            setLoading(false)
        } catch (error) {
            setReceitas([])
            setLoading(false)
            console.log(error.message)
        }

    }

    const mudaPage = () => {
        history.push('/recipes/create')
    }


    const geraBotoes = (receita) => {
        if (receita.user.user_id === usuarioLogado.id) {
            return (<>
                <span><button onClick={() => handleShow(receita)}>Exibir</button></span> |
                <span><button onClick={() => handleEdit(receita)}>Editar</button></span> |
                <span> <button onClick={() => handleDelete(receita)}>Excluir</button></span></>)
        } else {
            return (<span><button onClick={() => handleShow(receita)}>Exibir</button></span>)
        }
    }



    const handleDelete = async (receita) => {
        if (window.confirm(`tem certeza que deseja deletar a receita ${receita.nome}?`)) {
            try {
                await deleteRecipe(receita)
                getRecipeList()
            } catch (error) {
                alert('erro ao deletar a receita')
            }
        }

    }

    const handleShow = (receita) => {
        history.push(`/recipes/${receita._id}`)
    }

    const handleEdit = (receita) => {
        history.push(`/recipes/edit/${receita._id}`)

    }

    const montarReceitas = () => {
        return receitas.map((receita, index) => (
            <tr className="linhaTabela" key={index}>
                <td className="tdTabela" >{formataStringTamanho(receita.nome)}</td>
                <td className="tdTabela" ><a className="linkProfile" href={`users/${receita.user.user_id}`}>{formataStringTamanho(receita.user.user_nome)}</a></td>
                <td className="tdTabela" >{receita.tipo}</td>
                <td className="tdTabela" >{receita.rendimento + " porções"}</td>
                <td className="tdTabela" >{receita.tempo + " minutos"}</td>
                <td className="tdTabela" >{mapeiaDificuldade[receita.dificuldade]}</td>
                <td className="tdTabela" > {geraBotoes(receita)}</td>
            </tr>
        ))
    }

    const montarTabela = () => {
        return (
            <div>
                {receitas.length > 0 ?
                    <table border="1">
                        <thead>
                            <tr>
                                <th>nome</th>
                                <th>autor(a)</th>
                                <th>tipo</th>
                                <th>rendimento</th>
                                <th>tempo</th>
                                <th>dificuldade</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {montarReceitas()}
                        </tbody>
                    </table> : conteudoVazio("receitas")}
            </div>
        )
    }

    useEffect(() => {
        getRecipeList()
    }, [])

    return (
        <>
            <div id="table">
                <nav>
                    <div className="title"> Lista de Receitas</div>
                    <div className="action">
                        <button onClick={() => mudaPage()} > + Novo</button>
                    </div>
                </nav>
                {loading ? <Loading /> : montarTabela()}
            </div>
        </>
    )
}

export default ListReceitas