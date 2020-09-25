import React, { useState, useEffect } from 'react'
import './alert.css'

const Alert = ({ alertInfo: { type, show, mensagem, erros } }) => {
    const [mostraAlert, setMostraAlert] = useState(show || false)


    const fechaAlert = () => {
        setMostraAlert(false);
        return;
    }

    const montaErros = (erros) => {
        return (
            <ul>
                {erros.map((erro, index) => (<li key={index} >{`${erro.param}: ${erro.msg}`}</li>)
                )}
            </ul>
        )
    }



    const createAlert = (type, message, icon, redirect = false) =>
        mostraAlert ? (
            <div className={`alert alert-${type}`} >
                <span>
                    <i className={`fa fa-${icon}`}></i> {message}
                    <br />
                    {erros ? montaErros(erros) : ""}
                    {redirect ? <small> Você será redirecionado para a Lista</small> : ""}
                </span>
                <div onClick={fechaAlert} style={{ cursor: 'pointer' }} ><i className="fa fa-close" /></div>
            </div>) : ""


    const montaAlert = (type, mensagem) => {
        switch (type) {
            case 'success':
                return createAlert('success', mensagem, 'check', true);
            case 'error':
                return createAlert('error', mensagem, 'exclamation-triangle', false);
            case 'info':
                return createAlert('info', mensagem, 'question-circle', false);
            default:
                break;
        }
    }

    useEffect(() => {
        setMostraAlert(show)
        return () => setMostraAlert(false);
    }, [show])

    return (
        <React.Fragment>
            {montaAlert(type, mensagem)}
        </React.Fragment>
    )
}

export default Alert