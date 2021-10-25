import axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/todo.css';
// components
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
// service
const fetchTodos = async () => {
  const { data } = await axios.get('http://localhost:7000/Todo');
  return data;
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchTodos().then((data) => {
      setTodos(data);
    });
  }, []);
  const todoAdded = (value) => {
    setTodos((prev) => [
      ...prev,
      {
        id: -1,
        name: value,
      },
    ]);
  };

  const todoSaved = (savedData) => {
    setTodos((prev) =>
      prev.map((d) => {
        if (d.name === savedData.name) {
          d.id = savedData.id;
        }
        return d;
      })
    );
  };
  return (
    <div>
      <AddTodo todoCreated={todoAdded} todoSaved={todoSaved} />

      <ul className="list-style">
        {todos.map((listData, index) => {
          return <TodoItem name={listData.name} id={listData.id} key={index} />;
        })}
      </ul>
    </div>
  );
};

export default TodoList;
