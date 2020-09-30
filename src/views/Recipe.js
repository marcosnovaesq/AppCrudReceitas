import React, { useContext, useState, useEffect } from 'react'
import ListReceitas from '../components/list/receitas/list-receitas'
import FormReceita from '../components/form/receitas/form-receita'
import ShowRecipe from '../components/show/recipe/show-recipe';
import UserContext from '../context/usercontext'
import {
    Route, Redirect
} from "react-router-dom";
import { getRecipeById } from '../service/recipe';

const ViewRecipe = (props) => {
    const { usuarioLogado } = useContext(UserContext)
    const [temPermissao, setTemPermissao] = useState()

    useEffect(() => {
        const eDonoDaReceita = async () => {
            try {
                const id = props.location.pathname.substring(14)
                const recipe = await getRecipeById(id)
                return recipe.data.user.user_id === usuarioLogado.id
            } catch (error) {
                console.log(error.message)
                return false
            }
        }
        if (props.location.pathname.includes('edit')) {
            if (eDonoDaReceita()) {
                setTemPermissao(true)
            }
            else {
                setTemPermissao(false)
            }
        }
        return () => { }
    }, [props.location.pathname, usuarioLogado.id])


    const rotaASerExibida = () => {
        if (props.location.pathname === '/recipes') {
            return <Route exact match path={props.match.path} component={ListReceitas} />
        }
        else if (props.location.pathname === '/recipes/create') {
            return <Route match path={props.match.path + "/create"} component={FormReceita} />
        }
        else if (props.location.pathname.includes('edit')) {
            if (temPermissao) {
                return <Route exact path={props.match.path + "/edit/:id"} component={FormReceita} />
            }
            else {
                return <Redirect to="/recipes" />
            }
        }
        else {
            return <Route exact path={props.match.path + "/:id"} component={ShowRecipe} />
        }
    }

    return rotaASerExibida()
}



export default ViewRecipe