import React from 'react'
import { Row, Col } from 'antd';
import { Table, Popconfirm, Button } from 'antd';

export default function Todos({todos, rowSelection, loading, rowClassName}) {
 
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
                    <Table rowSelection={rowSelection} dataSource={todos} columns={columns} rowKey={todo => todo.id} loading={loading} rowClassName={rowClassName}/>
                </Col>
                 <Col xs={0} sm={4} md={4} lg={8} xl={10}></Col>
            </Row>
            
        </React.Fragment>
    )
}
