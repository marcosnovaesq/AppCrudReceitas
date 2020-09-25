import React, { useState, useEffect } from 'react'
import { createUser, getUserById, updateUser } from '../../../service/user'
import { useHistory, useParams } from 'react-router-dom'
import Alert from '../../alert/alert'
import '../form.css'

const FormUser = () => {

    const [form, setForm] = useState({
        isAdmin: false,
        isActive: true
    })
    const [alert, setAlert] = useState({})
    const history = useHistory()
    const [isEdit, setIsEdit] = useState(false)
    const methodSubmit = isEdit ? updateUser : createUser
    const { id } = useParams()

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        return
    }

    const formIsPreenchido = () => {
        return form.nome && form.email && form.telefone && form.senha && form.senhaConfirmacao
    }


    useEffect(() => {
        const getShowUser = async (id) => {
            const user = await getUserById(id)
            if (user.data.senha) {
                delete user.data.senha
            }
            setForm(user.data)
        }

        if (id) {
            getShowUser(id)
            setIsEdit(true)
        }

    }, [id])


    const submitForm = async (event) => {
        try {
            event.preventDefault()
            await methodSubmit(form)
            setForm({})
            setAlert({
                type: 'success',
                mensagem: 'Formulario enviado com sucesso',
                show: true
            })

            setTimeout(() =>
                history.push('/users')
                , 3000)
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
        }
        window.scrollTo(0, 0)
    }

    return (
        <div className="form">

            <h2>{isEdit ? "Atualize seus dados!" : "Formulário de cadastro"}</h2>
            <Alert alertInfo={alert} />
            <form>
                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input onChange={(e) => handleChange(e)} value={form.nome || ""} type="text" name="nome" id="inputName" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input disabled={isEdit} onChange={(e) => handleChange(e)} value={form.email || ""} type="text" name="email" id="inputEmail" />
                </div>
                <div className="form-group">
                    <label htmlFor="telefone">Telefone:</label>
                    <input onChange={(e) => handleChange(e)} value={form.telefone || ""} type="text" name="telefone" id="inputTel" />
                </div>
                <div className="form-group">
                    <label htmlFor="senha">Senha:</label>
                    <input onChange={(e) => handleChange(e)} value={form.senha || ""} type="password" name="senha" id="inputSenha" placeholder={isEdit ? "Atualize sua senha" : ""} />
                </div>
                <div className="form-group">
                    <label htmlFor="senhaConfirmacao">Confirmacao de Senha:</label>
                    <input onChange={(e) => handleChange(e)} value={form.senhaConfirmacao || ""} type="password" name="senhaConfirmacao" id="inputSenha" />
                </div>

                <div className="form-group"><button onClick={(e) => submitForm(e)} disabled={!formIsPreenchido()} className="buttonSubmit">{isEdit ? 'Atualizar' : 'Enviar!'}</button></div>
            </form>
        </div>
    )

}

export default FormUser