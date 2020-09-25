import React from 'react'

const formataStringTamanho = (value) => {
    if (value.length > 15) {
        const parteValue = value.substr(0, 15)
        return `${parteValue}...`
    }
    return value

}

const mapeiaDificuldade = {
    "1": "Muito Fácil",
    "2": "Fácil",
    "3": "Normal",
    "4": "Difícil",
    "5": "Muito Difícil"
}

const booleanToString = (value) => {
    return value ? "Sim" : "Não"
}

const conteudoVazio = (entity) => {
    const texto = `Não tem ${entity} disponiveis :(`
    return (
        <h2 className="semConteudo">{texto}</h2>
    )
}

export {
    formataStringTamanho,
    mapeiaDificuldade,
    booleanToString,
    conteudoVazio
}