import React, { useEffect } from 'react'
import './App.css'
import Screen from './components/BaseScreen'
import useLocalStorageState from 'use-local-storage-state'

const App = () => {
  const [todos, setTodos] = useLocalStorageState("todos",{ defaultValue: []});
  const [newTodo, setNewTodo] = useLocalStorageState("newTodo",{ defaultValue: "" })
  const [showAlert, setShowAlert] = useLocalStorageState("showAlert",{ defaultValue: false })
  const [bgcolor, setColorBg] = useLocalStorageState("bgcolor", { defaultValue: "#F2BFA4" })

  
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false)
      }, 2300)
      return () => clearTimeout(timer)
    }
  }, [showAlert])
  
  const addTodo = () => {
    if (newTodo.trim() != "") {
      setTodos([...todos, { id: Date.now(), todo: newTodo.trim(), isCompleted: false }])
      setNewTodo("")
      setShowAlert(false)
    }
    else {
      setShowAlert(true)
    }
  }
  
  const handleCheckboxes = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    )
  }
  const editTodo = (id) => {
    const editTodoLetters = todos.find((todo) => todo.id === id)
    setNewTodo(editTodoLetters.todo)
    setTodos(todos.filter((todo) => todo.id != id))
  }
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id != id))
  }
  return (
    <>
      <div className="app min-h-screen flex items-center justify-center" style={{backgroundColor:bgcolor, transition:"background-color 1.5s ease-in"}}>
        <Screen todos={todos}
          setTodos={setTodos}
          newTodo={newTodo}
          showAlert={showAlert}
          handleCheckboxes={handleCheckboxes}
          setNewTodo={setNewTodo}
          addTodo={addTodo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
          setColorBg={setColorBg}
          bgcolor={bgcolor}
        />

      </div>
    </>
  )
}

export default App