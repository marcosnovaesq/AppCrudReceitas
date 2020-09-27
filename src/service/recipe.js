import { clientHTTP } from '../config/config'

const createRecipe = (data) => clientHTTP.post('/recipes/new', data)

const listRecipe = () => clientHTTP.get('/recipes')

// const listRecipesByUser = (userId) => clientHTTP.get(`/recipes?userId=${userId}`)

const deleteRecipe = (receita) => clientHTTP.delete(`/recipes/${receita._id}`)

const getRecipeById = (id) => clientHTTP.get(`/recipes/${id}`)

export {
    createRecipe,
    listRecipe,
    deleteRecipe,
    getRecipeById
}