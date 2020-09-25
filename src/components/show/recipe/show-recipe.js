import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../layout/loading/loading'
import './showrecipe.css'
import '../show.css'
import { getRecipeById } from '../../../service/recipe'

const ShowRecipe = () => {

    const [recipe, setRecipe] = useState({})
    const [loading, setLoading] = useState(true)
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

    const montaExibicaoReceita = () => {
        return (
            <>
                {Object.keys(recipe).length === 0 ? <h1>receita nao encontrada :(</h1> :
                    <div className="divShow">
                        <div className="divInfo">
                            <p><b>nome:</b> {recipe.nome}</p>
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