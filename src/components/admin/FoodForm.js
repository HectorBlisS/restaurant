import React, { useState } from 'react'
import { Input, Select, Button } from 'antd'

const { Option } = Select;

export default function FoodForm({ categories, food, onChange }) {
    let [option, setOption] = useState({})
    function onChangeOption({ target: { name, value } }) {
        console.log(name, value)
        setOption({ ...option, [name]: value })
    }
    function addOption() {
        onChange({ target: { name: "options", value: [...food.options, { ...option }] } })
        setOption({})
    }

    function removeOptions() {
        onChange({ target: { name: "options", value: [] } })
    }

    function renderOption(op, i) {
        console.log(op)
        return <p key={i}>Texto: {op.text}, Precio: {op.price}</p>
    }
    return (
        <div>
            <p>
                Nombre:
            <Input name="name" onChange={onChange} value={food.name} size="large" placeholder="Nombre" />
            </p>
            <p>
                Detalles:
            <Input name="details" onChange={onChange} value={food.details} size="large" placeholder="Detalles" />
            </p>
            <p>
                Precio:
            <Input type="number" name="price" onChange={onChange} value={food.price} size="large" placeholder="Precio" />
            </p>
            <div>
                Categoría:
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Categorías"
                    defaultValue={Object.keys(food.categories)}
                    onChange={value => onChange({ target: { name: "categories", value } })}
                >
                    {categories.map((c, i) => <Option value={c} key={i}>{c}</Option>)}


                </Select>
            </div>
            <p>
                Subcategoría:
            <Input name="subCategory" onChange={onChange} value={food.subCategory} size="large" placeholder="Subcategoría" />
            </p>
            <p>
                Imagen:
            <Input name="pic" onChange={onChange} value={food.pic} size="large" placeholder="Pega un link" />
            </p>
            <div>
                <p>Opciones: <Button onClick={removeOptions}>Borrar opciones</Button></p>
                {food.options && food.options.map(renderOption)}

                <div style={{ display: "flex" }}>

                    <Input name="text" value={option.text} onChange={onChangeOption} size="large" placeholder="Texto de la opción" />
                    <Input name="price" value={option.price} onChange={onChangeOption} size="large" placeholder="Precio de la opción" />

                </div>
                <Button onClick={addOption} >Agregar opción</Button>
            </div>

        </div>
    )
}