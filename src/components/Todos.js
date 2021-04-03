import React from 'react'
import { Row, Col } from 'antd';
import { Table, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default function Todos({todos, rowSelection, loading, rowClassName, onRow}) {

    const columns=[{
        title: 'Title',
        key: 'title',
        dataIndex: 'title',
    },
    {
        title: '',
        key:'action',
        render: (text, record) => (
            <>
             <Button
                    icon={<EditOutlined />}
                    type='primary'
                    style={{marginRight:'1rem'}}
                />
                <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    danger
                />
            </>
        ),
        align: 'right'
    }
    // {
    //     title: 'Actions',
    //     render: (text, record) => {
    //         <Popconfirm title='Delete?' onConfirm={() => alert('deleted')}>
    //             <Button>Delete</Button>
    //         </Popconfirm>
    //     }
    // }
]
    return (
        <Table rowSelection={rowSelection} dataSource={todos} columns={columns} rowKey={todo => todo.id} loading={loading} rowClassName={rowClassName} onRow={onRow}/>
    )
}
