import '../styles/todo.css';

const TodoItem = (props) => {
  return <li className={`list-item${props.id < 0 ? ' optimistic' : ''}`}>{props.name}</li>;
};

export default TodoItem;
