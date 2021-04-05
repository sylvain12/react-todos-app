import React from 'react'
import {Row, Col, Input, Button} from 'antd'

export default function AddTodo({onAddTodo, onEditTodo, isEdit, title, updateTitle, todo}) {

    const resetTitle = () => updateTitle('')

    const addTodo = () => {
        onAddTodo(title)
       resetTitle()
    }

    const editTodo = () => {
        onEditTodo(todo)
    }
    return (
        <>
        <Row>
            <Col span={20}>
                <Input placeholder="Enter your todo" name="title" onInput={(e) => updateTitle(e.target.value)} value={title} />
            </Col>
            <Col span={4}>
                {(!isEdit || title === '') ? <Button onClick={addTodo} style={{width:'100%'}} type="primary">Add</Button> : <Button onClick={editTodo} style={{width:'100%'}} type="primary">Edit</Button> }
                
            </Col>
        </Row>
    </>
    )
}
