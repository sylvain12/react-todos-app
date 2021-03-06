import React, { useState, useEffect } from 'react'
import { Checkbox, Row, Col, Typography } from 'antd';
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import 'antd/dist/antd.css';
import './App.css'
import 'process'


function getApiBaseUrl() {
  const ENV = process.env.REACT_TODO_APP_ENV
  return ENV === 'dev'? 'http://localhost:8000' : 'https://django-todos-api.herokuapp.com'
}

const BASE_URL = getApiBaseUrl()
console.log(BASE_URL)

function App() {
  const [appState, setAppState] = useState({
        todos: [],
        isLoading: false,
    })
  const [isEdit, setIsEdit]= useState(false)
  const [title, setTitle] = useState('')
  const [todo, setTodo] = useState({})

    const {Title} = Typography
    const apiURL = `${BASE_URL}/api/todos/`

    const toggleCompleted  = (todo) => {
      const apiURL = `${BASE_URL}/api/todo/${todo.id}/`
      fetch(apiURL, {
        method: 'PATCH',
        body: JSON.stringify({completed: !todo.completed}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
      .then(data => {
          const updatedTodos = appState.todos.map(todo => {
            if(todo.id === data.id) todo.completed = data.completed
            return todo
          })
          setAppState({
            todos: updatedTodos
          })
      })
    }

    const rowSelection = {
      hideSelectAll: true,
      renderCell: (checked, record, index, originNode) => {
      checked = record.completed
       return <Checkbox onClick={() => toggleCompleted(record)} checked={checked}/>
      },
    }

    const updateTitle = (title) => {
      setTitle(title)
    }

    const addTodo = (title) => {
      fetch(apiURL, {
        method: 'POST',
        body: JSON.stringify({title: title}),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
      .then(todo => {
        setAppState({
          todos: [todo, ...appState.todos]
        })
      })
    }

    const onTodoDelete = (todo) => {
      const apiURL = `${BASE_URL}/api/todo/${todo.id}/`
      fetch(apiURL, {
        method: 'DELETE',
      }).then(response => '')
      .then(() => {
        const newTodos = appState.todos.filter(item => item.id !== todo.id)
          setAppState({todos: newTodos})
      })
    }

    const rowClassName = (record, index) => {
      if(record.completed) return 'is-completed todo disabled'
      return ''
    }

    const setTodoToEdit = (todo) => {
      setIsEdit(true)
      setTitle(todo.title)
      setTodo(todo)
    }

    const onEditTodo = (todo) => {
      const apiURL = `${BASE_URL}/api/todo/${todo.id}/`

      fetch(apiURL, {
        method: 'PATCH',
        body: JSON.stringify({title: title}),
        headers: {'Content-Type': 'application/json'}
      }).then(response => response.json())
      .then(data => {
        const updatedTodos = appState.todos.map(item => {
          if(item.id === data.id) item.title = title
          return item
        })
        setAppState({todos: updatedTodos})
        setIsEdit(false)
        setTitle('')
      })
    }

    useEffect(() => {
        setAppState({isLoading: true})
          fetch(apiURL)
          .then(response => response.json())
          .then(data => setAppState({
            todos: data, 
            isLoading: false,
          }))
    }, [apiURL])

  return (
    <div className="container">
      <Row>
          <Col span={6} xs={1}></Col>
          <Col span={12} xs={22}>
            <Title level={2}>Todos App</Title>
          </Col>
          <Col span={6} xs={1}></Col>
      </Row>

      <Row>
        <Col span={6} xs={1}></Col>
        <Col span={24} xs={22}>
          <AddTodo onAddTodo={addTodo} onEditTodo={onEditTodo} isEdit={isEdit} title={title} updateTitle={updateTitle} todo={todo} />
        </Col>
        <Col span={6} xs={1}></Col>
      </Row>

      <Row>
        <Col span={6} xs={1}></Col>
        <Col span={12} xs={22}>
          <Todos loading={appState.isLoading} todos={appState.todos} rowSelection={rowSelection} rowClassName={rowClassName} onTodoDelete={onTodoDelete} setTodoToEdit={setTodoToEdit} />
        </Col>
        <Col span={6} xs={1}></Col>
      </Row>
    </div>
  );
}

export default App;
