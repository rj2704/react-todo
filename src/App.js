import React, { useEffect, useState } from 'react';
import Form from './components/Form';
import TodoList from './components/TodoList';
import './App.css';
function App() {
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]); 
    const [status, setStatus] = useState('all');
    const [filteredTodos, setFilteredTodos] = useState([]);

    useEffect(() => {
      getLocalTodos();
    }, []);

    useEffect(() => {
      filterHandler();
      saveLocalTodos();
    }, [todos, status]);

    const filterHandler = () => {
      switch (status) {
        case "completed":
          setFilteredTodos(todos.filter((todo) => todo.completed === true));
          break;

        case "uncompleted":
          setFilteredTodos(todos.filter((todo) => todo.completed === false));
          break;

        default:
          setFilteredTodos(todos);
          break;
      }
    };


    const saveLocalTodos = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    const getLocalTodos = () => {
      if (localStorage.getItem("todos") === null) {
        localStorage.setItem("todos", JSON.stringify([]));
      } else {
        let todoLocal = JSON.parse(localStorage.getItem("todos"));
        setTodos(todoLocal);
      }
    }

  return (
    <div className="app">
      <header>
        <h1>Todo List</h1>
        <img className='header-icon'
        src='https://cdn4.iconfinder.com/data/icons/action-hand-drawn-color/64/to-do-list-512.png' alt='icon' />
      </header>
      <Form 
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList 
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
