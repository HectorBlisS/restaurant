import React from 'react'
import { Input, Select, } from 'antd'

const { Option } = Select;

export default function UserForm({ roles = ["ADMIN", "MESERO", "CLIENT"], form = {}, onChange }) {
    return (
        <div>
            <p>
                Nombre:
            <Input name="name" onChange={onChange} value={form.name} size="large" placeholder="Nombre" />
            </p>
            <p>
                email:
            <Input name="email" onChange={onChange} value={form.email} size="large" placeholder="email" />
            </p>
            <div>
                Tipo de usuario:
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="tipo de usuario"
                    defaultValue={form.roles}
                    onChange={value => onChange({ target: { name: "roles", value } })}
                >
                    {roles.map((c, i) => <Option value={c} key={i}>{c}</Option>)}


                </Select>
            </div>
            <p>
                Password:
            <Input name="password" onChange={onChange} value={form.password} size="large" placeholder="password" />
            </p>
            <p>
                Repetir password:
            <Input name="password2" onChange={onChange} value={form.password2} size="large" placeholder="repite tu contraseña" />
            </p>

        </div>
    )
}