import { useState } from 'react';
import axios from 'axios';
import '../styles/todo.css';

import { useMutation, useQueryClient } from 'react-query';

const addTodos = async (todoItem) => {
  const req = {
    name: todoItem,
  };
  const { data } = await axios.post('http://localhost:7000/Todo/addTodo', req);
  return data;
};
const AddTodo = (props) => {
  const [todo, setTodo] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation(addTodos, {
    onSuccess: (result) => {
      setTodo('');
      queryClient.invalidateQueries('todos');
      setTimeout(() => {
        props.todoSaved(result.data);
      }, 1000);
    },
  });
  const addTodoSubmit = () => {
    if (todo) {
      mutation.mutate(todo);
      props.todoCreated(todo);
    }
  };
  return (
    <div className="todo-search">
      <input
        type="text"
        name="todoadd"
        value={todo}
        onChange={(event) => {
          setTodo(event.target.value);
        }}
        className="input-custom"
      />{' '}
      <button onClick={addTodoSubmit} className="custom-button">
        Add
      </button>
    </div>
  );
};

export default AddTodo;
