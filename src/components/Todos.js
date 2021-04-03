import React, {useState, useEffect} from 'react'
import { Row, Col } from 'antd';
import { Table, Popconfirm, Button } from 'antd';

export default function Todos(props) {
    const [appstate, setAppState] = useState({
        todos: [],
        isLoading: false
    })

    useEffect(() => {
        setAppState({
            isLoading: true
        })
        const apiURL = "http://localhost:8000/api/todos"
        fetch(apiURL)
        .then(response => response.json())
        .then(data => setAppState({
            todos: data,
            isLoading: false
        }))
    })
    const todos = appstate.todos
    const columns=[{
        title: 'Title',
        dataIndex: 'title'
    },
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
        <React.Fragment>
            <Row>
                 <Col xs={0} sm={4} md={4} lg={8} xl={10}></Col>
                <Col xs={24} sm={16} md={16} lg={8} xl={4}>
                    <Table dataSource={todos} columns={columns} />
                </Col>
                 <Col xs={0} sm={4} md={4} lg={8} xl={10}></Col>
            </Row>
            
        </React.Fragment>
    )
}
