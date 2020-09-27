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

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const formataData = (data) => {
    let dia = data.substring(0, 10).split('-').reverse().join('/')
    let hora = data.substring(11, 16)
    let resposta = dia + " às " + hora
    return resposta
}


export {
    formataStringTamanho,
    mapeiaDificuldade,
    booleanToString,
    conteudoVazio,
    formataData,
    capitalize
}