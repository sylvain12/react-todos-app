import React from 'react'
import { Table, Button, Popconfirm, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default function Todos({todos, rowSelection, loading, rowClassName, onTodoDelete, setTodoToEdit}) {

    const confirmDeleteTodo = (record) => {
        onTodoDelete(record)
        message.info(`todo ${record.id} deleted`)
    }

    const msg = 'Are you sure to delete this task?';

    const columns=[{
        title: 'Title',
        key: 'title',
        dataIndex: 'title',
    },
    {
        title: '',
        key:'action',
        render: (text, record) => (
            <div>
             <Button
                    onClick={() => setTodoToEdit(record)}
                    icon={<EditOutlined />}
                    type='primary'
                    style={{marginRight:'1rem', display: record.completed ? 'none' : ''}}
                />
            
                <Popconfirm
                    placement="topRight"
                    title={msg}
                    onConfirm={() => confirmDeleteTodo(record)}
                    okText="Yes"
                    cancelText="No"
                >
                <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    danger
                />
                </Popconfirm>
            </div>
        ),
        align: 'right'
    }
]
    return (
        <Table rowSelection={rowSelection} dataSource={todos} columns={columns} rowKey={todo => todo.id} loading={loading} rowClassName={rowClassName}/>
    )
}
