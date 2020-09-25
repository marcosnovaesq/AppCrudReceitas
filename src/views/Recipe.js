import React from 'react'
import ListReceitas from '../components/list/receitas/list-receitas'
import FormReceita from '../components/form/receitas/form-receita'
import ShowRecipe from '../components/show/recipe/show-recipe';
import {
    Route
} from "react-router-dom";

const ViewRecipe = (props) => {

    const rotaASerExibida = () => {
        if (props.location.pathname === '/recipes') {
            return <Route exact match path={props.match.path} component={ListReceitas} />
        }
        else if (props.location.pathname === '/recipes/create') {
            return <Route match path={props.match.path + "/create"} component={FormReceita} />
        }
        else {
            return <Route match path={props.match.path + "/:id"} component={ShowRecipe} />
        }
    }

    return rotaASerExibida()
}



export default ViewRecipe