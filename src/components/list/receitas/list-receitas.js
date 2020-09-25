import React, { useState, useEffect } from 'react'
import { listRecipe, deleteRecipe } from '../../../service/recipe';
import Loading from '../../layout/loading/loading'
import { mapeiaDificuldade, formataStringTamanho, conteudoVazio } from '../../../helpers/dataHelper'
import { useHistory } from 'react-router-dom'
import '../list.css'
const ListReceitas = () => {

    const [receitas, setReceitas] = useState([])
    const [loading, setLoading] = useState(false)
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

    const montarReceitas = () => {
        return receitas.map((receita, index) => (
            <tr className="linhaTabela" onClick={() => handleShow(receita)} key={index}>
                <td className="tdTabela" >{formataStringTamanho(receita.nome)}</td>
                <td className="tdTabela" >{receita.tipo}</td>
                <td className="tdTabela" >{receita.rendimento + " porções"}</td>
                <td className="tdTabela" >{receita.tempo + " minutos"}</td>
                <td className="tdTabela" >{mapeiaDificuldade[receita.dificuldade]}</td>
                <td className="tdTabela" > <span><button>Editar</button></span> |<span> <button onClick={() => handleDelete(receita)}>Excluir</button></span></td>
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