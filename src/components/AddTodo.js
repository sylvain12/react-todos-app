import React, {useState} from 'react'
import {Row, Col, Input, Button, Form, Typography} from 'antd'

export default function AddTodo({onAddTodo}) {
    const [title, setTitle] = useState('')
    // const {Text} = Typography

    const resetTitle = () => setTitle('')

    const addTodo = () => {
        onAddTodo(title)
       resetTitle()
    }
    return (
        <>
        <Row>
            <Col span={20}>
                <Input placeholder="Enter your todo" name="title" onInput={(e) => setTitle(e.target.value)} value={title} />
            </Col>
            <Col span={4}>
                <Button onClick={addTodo} style={{width:'100%'}} type="primary">Add</Button>
            </Col>
        </Row>
    </>
    )
}
