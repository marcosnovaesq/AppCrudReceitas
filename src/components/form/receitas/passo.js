import React, { useState } from 'react'
import '../form.css'
const Passo = ({ addPasso }) => {

    const [passo, setPasso] = useState("")

    const handleChange = (e) => setPasso(e.target.value)

    const incluirPasso = () => {
        addPasso(passo)
        setPasso("")
    }

    return (
        <div className="divPassos">
            <input type="text" onChange={(e) => handleChange(e)} value={passo || ""} name="passo" className="inputPassos" />
            <button type="button" disabled={!passo} onClick={incluirPasso} className="buttonPassos btnAdd addItem" >+</button>
        </div>
    )
}

export default Passo