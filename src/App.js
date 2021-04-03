import React, { useState, useEffect } from 'react'
import { Checkbox, Row, Col, Typography } from 'antd';
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import 'antd/dist/antd.css';
import './App.css'

function App() {
  const [appState, setAppState] = useState({
        todos: [],
        isLoading: false,
        // selectedRows: []
    })

    const {Title} = Typography
    const apiURL = "http://localhost:8000/api/todos/"

    // const rowSelection = (todo) => {
    //   if(todo.completed) console.log('todo.name')
    // }

    const toggleCompleted  = (todo) => {
      const apiURL = `http://localhost:8000/api/todo/${todo.id}/`
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
      // onSelect: (record, selected, selectedRows, nativeEvent) => {
      //   console.log(selectedRows)
      // }
    }

    const onRow = (record,index) => {
      // if(record.completed) 
      // console.log(record.title)
      return {
        style: () => {
          console.log('style')
        }
      }
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

    const rowClassName = (record, index) => {
      if(record.completed) return 'is-completed todo disabled'
      return ''
    }

    useEffect(() => {
        setAppState({isLoading: true})
        
        setTimeout(() => {
          fetch(apiURL)
          .then(response => response.json())
          .then(data => setAppState({
            todos: data, 
            isLoading: false, 
            // selectedRows: data.filter(todo => todo.completed) 
          }))
        }, 1000)
      
    }, [])

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
          <AddTodo onAddTodo={addTodo} />
        </Col>
        <Col span={6} xs={1}></Col>
      </Row>

      <Row>
        <Col span={6} xs={1}></Col>
        <Col span={12} xs={22}>
          <Todos loading={appState.isLoading} todos={appState.todos} rowSelection={rowSelection} rowClassName={rowClassName} onRow={onRow} />
        </Col>
        <Col span={6} xs={1}></Col>
      </Row>
    </div>
  );
}

export default App;
