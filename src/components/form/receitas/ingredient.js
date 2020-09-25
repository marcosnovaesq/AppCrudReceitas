import React, { useState } from 'react'
import '../form.css'
const Ingredient = ({ addIng }) => {

    const [ingrediente, setIngrediente] = useState("")

    const handleChange = (event) => setIngrediente(event.target.value)

    const addIngrediente = () => {
        addIng(ingrediente)
        setIngrediente("")
    }


    return (
        <div className="divIngrediente">
            <input type="text" onChange={handleChange} value={ingrediente || ""} name="ingredientes" className="inputIngredientes" />
            <button type="button" disabled={!ingrediente} onClick={addIngrediente} className="buttonIngrediente btnAdd addItem">+</button>
        </div>
    )
}

export default Ingredient