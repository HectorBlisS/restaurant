import React from 'react'
import { Input, Select, } from 'antd'

const { Option } = Select;

export default function FoodForm({ categories, food, onChange }) {
    console.log(food)
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

        </div>
    )
}