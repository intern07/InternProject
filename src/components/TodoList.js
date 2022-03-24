import React, { useState, useEffect } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import { calculateNewValue } from '@testing-library/user-event/dist/utils'

const TodoList = () => {
    const [todos, setTodos] = useState([])
    const axios = require('axios');

    useEffect(() => {
        // setLoading(true)
        let cancel
        axios.get(`http://localhost:5000/todo`,
            {
                cancelToken: new axios.CancelToken(c => cancel = c)
            })
            .then(res => {
                // setLoading(false)
                console.log(res.data)
                setTodos(res.data.map(p => p))
            })

        return () => cancel()
    }, [])




    const addTodo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }     
        axios.post('http://localhost:5000/todo', todo)
        .then(response => console.log(response.data.id))
        const newTodos = [todo, ...todos]

        setTodos(newTodos)
        // console.log(todo, ...todos)
    }

    const removeTodo = async (id) => {
        axios.delete(`http://localhost:5000/todo/${id}`)
        .then(() => console.log('delete success') )
        const removeArr = [...todos].filter(todo => todo.id !== id)
        setTodos(removeArr)
    }

    const editTodo = (id, newVal) => {
        if (!newVal.text || /^\s*$/.test(newVal.text)) {
            return
        }
        axios.put(`http://localhost:5000/todo/${id}`, newVal)
        .then(res => console.log('update success'))

        setTodos(prev => prev.map(item => (item.id === id ? newVal : item))
        );
    }

    const completeTodo = (id) => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo;
        })

        setTodos(updatedTodos)
    }
    return (
        <div className='todo-app'>
            <h1>What's the plan?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo todos={todos}
                completeTodo={completeTodo} 
                removeTodo={removeTodo} 
                editTodo={editTodo} />
        </div>
    )
}

export default TodoList