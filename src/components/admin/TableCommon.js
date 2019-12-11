import React from 'react'
import { Table } from 'antd';
import moment from 'moment';

export default function TableCommon({ columns, data }) {
    console.log(data)
    columns = columns || [
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
            render: text => <a>{moment().format('ll')}</a>,
        },
        {
            title: "Total",
            dataIndex: 'items',
            key: 'items',
            render: items => <span>$ {items.reduce((acc, item) => acc + item.total, 0)}</span>
        },
        {
            title: '¿Cerrada?',
            dataIndex: 'finished',
            key: 'finished',
            render: value => <span>{value ? "Sí" : "No"}</span>,
        }
    ];

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}