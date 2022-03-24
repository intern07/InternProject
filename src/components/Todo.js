import React, { useState } from 'react'
import TodoForm from './TodoForm'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'

const Todo = ({ todos, completeTodo, removeTodo, editTodo }) => {
    const [edit, setEdit] = useState({
        id:null,
        value: ''
    })

    const submitEdit = value => {
        editTodo(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitEdit} />
    }
    console.log(todos)
//.slice(0).reverse()
  return todos.map((todo, index) => (
      <div 
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'} 
      key={index}>
    
        <div key={todo.id} onClick={() => completeTodo(todo.id)}>
            {todo.text}
        </div>
        <div className='icons'>
            <RiCloseCircleLine className='delete-icon' 
            onClick={() => removeTodo(todo.id)} />
            <TiEdit className='edit-icon' 
            onClick={() => setEdit({id: todo.id, value: todo.text})}/>
        </div>
      </div>

  ));
}

export default Todo