import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Alert from '../../alert/alert'
import { processoLogin } from '../../../service/auth'
import UserContext from '../../../context/usercontext'
import '../form.css'
const Login = () => {
    const [form, setForm] = useState({})
    const [alert, setAlert] = useState({})
    const { setUsuarioLogado } = useContext(UserContext)
    const history = useHistory()

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        return
    }

    const formIsValid = () => {
        return form.email && form.senha
    }

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            const user = await processoLogin(form)
            setForm({})
            setAlert({
                type: 'success',
                mensagem: 'Login realizado com sucesso',
                show: true
            })
            window.scrollTo(0, 0)
            console.log(user)
            setTimeout(() => {
                history.push('/recipes')
                setUsuarioLogado(user)
            }
                , 1000)
        } catch (error) {
            if (error.response) {
                setAlert({
                    type: 'error',
                    show: true,
                    mensagem: 'Erros no envio do formulario:',
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
            window.scrollTo(0, 0)
        }

    }

    return (
        <>
            <div className="form">
                <form>
                    <h2>LOGIN</h2>
                    <Alert alertInfo={alert} />
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input onChange={(e) => handleChange(e)} type="text" value={form.email || ""} name="email" id="inputEmail" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="senha">Senha:</label>
                        <input onChange={(e) => handleChange(e)} value={form.senha || ""} type="password" name="senha" id="inputSenha" />
                    </div>
                    <button onClick={(e) => submitForm(e)} disabled={!formIsValid()} className="buttonSubmit">Enviar!</button>
                </form>
            </div>
        </>
    )
}

export default Login