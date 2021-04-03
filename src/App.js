import React, { useState, useEffect } from 'react'
import Todos from './components/Todos'
import 'antd/dist/antd.css';
import './App.css'
import { Checkbox } from 'antd';

function App() {
  const [appState, setAppState] = useState({
        todos: [],
        isLoading: false,
        // selectedRows: []
    })

    // const rowSelection = (todo) => {
    //   if(todo.completed) console.log('todo.name')
    // }

    const rowSelection = {
      hideSelectAll: true,
      renderCell: (checked, record, index, originNode) => {
      checked = record.completed
       return <Checkbox checked={checked}/>
      },
      // onSelect: (record, selected, selectedRows, nativeEvent) => {
      //   console.log(selectedRows)
      // }
    }

    const rowClassName = (record, index) => {
      if(record.completed) return 'is-completed disabled'
      return ''
    }

    useEffect(() => {
        setAppState({isLoading: true})
        const apiURL = "http://localhost:8000/api/todos/"
        fetch(apiURL)
        .then(response => response.json())
        .then(data => setAppState({
          todos: data, 
          isLoading: false, 
          // selectedRows: data.filter(todo => todo.completed) 
        }))
    }, [])

  return (
    <div className="container">
      <Todos loading={appState.isLoading} todos={appState.todos} rowSelection={rowSelection} rowClassName={rowClassName} />
    </div>
  );
}

export default App;
