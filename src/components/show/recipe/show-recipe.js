import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Loading from '../../layout/loading/loading'
import './showrecipe.css'
import '../show.css'
import { getRecipeById } from '../../../service/recipe'
import { mapeiaDificuldade, formataData, capitalize } from '../../../helpers/dataHelper'
import UserContext from '../../../context/usercontext'

const ShowRecipe = () => {

    const [recipe, setRecipe] = useState({})
    const [loading, setLoading] = useState(true)
    const { usuarioLogado } = useContext(UserContext)
    const history = useHistory()
    const { id } = useParams()


    const getShowRecipe = async (id) => {
        try {
            setLoading(true)
            const recipe = await getRecipeById(id)
            setRecipe(recipe.data)
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            setRecipe({})
            setLoading(false)
        }
    }

    const handleEdit = (receita) => {
        history.push(`/recipes/edit/${receita._id}`)

    }

    const montaExibicaoReceita = () => {
        return (
            <>
                {Object.keys(recipe).length === 0 ? <h1>receita nao encontrada :(</h1> :
                    <div className="divShow">
                        <div className="divInfo">
                            <p><b>Nome:</b> {capitalize(recipe.nome)}</p>
                            <p><b>Criado por:</b> <a className="linkItem" href={`/users/${recipe.user.user_id}`}>{capitalize(recipe.user.user_nome)}</a></p>
                            <p> <b>Data de criação:</b> {formataData(recipe.createdAt)}</p>
                            <p><b>Dificuldade:</b> {mapeiaDificuldade[recipe.dificuldade]}</p>
                            <p><b>Tempo estimado:</b> {recipe.tempo + " minutos"}</p>
                            <p><b>Rendimento estimado:</b> {recipe.rendimento + " porções"}</p>
                            <p><b>Tipo:</b> {capitalize(recipe.tipo)}</p>
                            <p><b>Ingredientes:</b></p>
                            <ol>
                                {recipe.ingredientes.map((value, index) => {
                                    return <li className="liShow" key={index}>{value}</li>
                                })}
                            </ol>
                            <p><b>Passos ( Como fazer ):</b></p>
                            <ol>
                                {recipe.passos.map((value, index) => {
                                    return <li className="liShow" key={index}>{value}</li>
                                })}
                            </ol>
                            {usuarioLogado.id === recipe.user.user_id ?
                                <div className="buttonShow">
                                    <button onClick={() => handleEdit(recipe)}>Editar Receita</button>
                                    <button>Deletar Receita</button>
                                </div> : ""}
                        </div>


                    </div>
                }

            </>
        )
    }


    useEffect(() => {
        getShowRecipe(id)
        return () => { }
    }, [id])

    return (
        <>
            {loading ? <Loading /> : montaExibicaoReceita()}
        </>
    )
}

export default ShowRecipe