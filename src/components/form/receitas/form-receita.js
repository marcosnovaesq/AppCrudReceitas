import React, { useState, useContext } from 'react'
import Ingredient from './ingredient'
import Passo from './passo'
import Alert from '../../alert/alert'
import { createRecipe } from '../../../service/recipe'
import UserContext from '../../../context/usercontext'
import { useHistory } from 'react-router-dom'
import '../form.css'

const FormReceita = () => {
    const history = useHistory()
    const { usuarioLogado } = useContext(UserContext)
    const [listIngredientes, setListIngredientes] = useState([])
    const [listPassos, setListPassos] = useState([])
    const [alert, setAlert] = useState({})
    const [form, setForm] = useState({
        "tipo": "salgado",
        "dificuldade": "1"
    })


    const incluirIng = (valor) => setListIngredientes([
        ...listIngredientes,
        valor
    ])


    const removeIng = (i) => {
        listIngredientes.splice(i, 1)
        setListIngredientes([
            ...listIngredientes
        ])
    }

    const incluirPasso = (valor) => setListPassos([
        ...listPassos,
        valor
    ])

    const removePasso = (i) => {
        listPassos.splice(i, 1)
        setListPassos([
            ...listPassos
        ])
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        return
    }

    // const formIsValid = () => {
    //     return (form.nome && form.rendimento && form.tempo && listPassos.length > 0 && listIngredientes.length > 0)
    // }

    const montaBody = () => {
        let body = {
            ...form
        }
        body["ingredientes"] = listIngredientes
        body["passos"] = listPassos
        body["user"] = usuarioLogado.id

        return body
    }

    const zeraForm = () => {
        setForm({
            "tipo": "salgado",
            "dificuldade": "1"
        })
        setListIngredientes([])
        setListPassos([])
    }

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            const reqBody = montaBody()
            await createRecipe(reqBody)
            zeraForm()
            setAlert({
                type: 'success',
                mensagem: 'Receita cadastrada com sucesso',
                show: true
            })
            setTimeout(() => {
                history.push('/recipes')
            }, 3000)
        } catch (error) {
            if (error.response) {
                setAlert({
                    type: 'error',
                    show: true,
                    mensagem: 'Erros na criação da receita:',
                    erros: error.response.data.erros
                })

            }
            else {
                setAlert({
                    type: 'info',
                    show: true,
                    mensagem: 'Aconteceu algo inesperado, tente novamente mais tarde'
                })
            }
        }
        window.scrollTo(0, 0)

    }

    return (
        <div className="form">
            <Alert alertInfo={alert} />
            <h2>Preencha com as informaçoes da sua receita</h2>
            <form >
                <div className="form-group">
                    <label htmlFor="nome">Nome da receita:</label>
                    <input onChange={(e) => handleChange(e)} value={form.nome || ""} type="text" name="nome" id="inputName" />
                </div>
                <div className="form-group">
                    <label htmlFor="tipo">Categoria:</label>
                    <select onChange={(e) => handleChange(e)} name="tipo" id="inputCategoria">
                        <option value="salgado">Salgado</option>
                        <option value="doce">Doce</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="rendimento">Rendimento(porçoes):</label>
                    <input onChange={(e) => handleChange(e)} value={form.rendimento || ""} type="number" name="rendimento" id="inputRendimento" />
                </div>
                <div className="form-group">
                    <label htmlFor="tempo">Tempo de preparo (minutos):</label>
                    <input onChange={(e) => handleChange(e)} value={form.tempo || ""} type="number" name="tempo" id="inputTempo" />
                </div>
                <div className="form-group">
                    <label htmlFor="dificuldade">Dificuldade:</label>
                    <select onChange={(e) => handleChange(e)} name="dificuldade" id="inputDificuldade">
                        <option value="1">1 ( Muito facil )</option>
                        <option value="2">2 ( facil )</option>
                        <option value="3">3 ( Normal )</option>
                        <option value="4">4 ( Dificil )</option>
                        <option value="5">5 ( Muito dificil )</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="ingredientes">Ingredientes:</label>
                    <div id="ingredientes">

                        <Ingredient addIng={incluirIng}></Ingredient>
                        {listIngredientes.length > 0 ? listIngredientes.map((item, index) => (
                            <div key={index}>
                                {(index + 1) + ". " + item}
                                <button type="button" className="removeItem" onClick={() => removeIng(index)} >-</button>
                            </div>
                        )) : ""}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="passos">Como fazer(Digite passo a passo): </label>
                    <div id="passos">
                        <Passo addPasso={incluirPasso}></Passo>
                        {listPassos.length > 0 ? listPassos.map((item, index) => (
                            <div key={index}>
                                {(index + 1) + ". " + item}
                                <button type="button" className="removeItem" onClick={() => removePasso(index)} >-</button>
                            </div>
                        )) : ""}
                    </div>
                </div>

                <div className="form-group"><button onClick={(e) => submitForm(e)} className="buttonSubmit">Enviar!</button></div>
            </form>
        </div>
    )
}

export default FormReceita