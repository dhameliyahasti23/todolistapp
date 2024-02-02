import React, { useState } from 'react';
import './App.css'

function App() {
  let [input, setInput] = useState('');
  let [todos, setTodos] = useState([]);
  let [edit, setEdit] = useState();
  let [search, setsearch] = useState('');
  let [all, setall] = useState([]);

  function submithandler() {
    if (edit !== undefined) {
      const updatedTodos = [...todos];
      updatedTodos[edit] = { text: input, completed: false };
      setTodos(updatedTodos);
      setEdit(undefined);
    } else if (input.trim() !== '') {
      setTodos([...todos, { text: input, completed: false }]);
      setall([...all, { text: input, completed: false }]);
    }
    setInput('');
  }

  const delhandler = (value) => {
    const updatedTasks = todos.filter((todo) => todo.text !== value);
    setTodos(updatedTasks);
  };

  const edithandler = (index) => {
    setInput(todos[index].text);
    setEdit(index);
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = { ...updatedTodos[index], completed: !updatedTodos[index].completed };
    setTodos(updatedTodos);
    setall(updatedTodos);
  };

  const Clickbtn = () => {
    const click = [...all];
    var data = click.filter((todo) => {
      return todo.text === search;
    })
    setTodos(data);
    setsearch("");
  };

  

  const Combtn = () => {
    const completebtn = all.filter((todo) => {
      return todo.completed == true;
    });
    setTodos(completebtn);
  };

  const unCombtn = () => {
    const completebtn = all.filter((todo) => {
      return todo.completed == false;
    });
    setTodos(completebtn);
  };

  const allbtn = () => {
    setTodos([...all]);
  }

  return (
    <div className='App'>
      <h1 className='title'>to do List</h1>
      <div className="box">
        <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
        <button className='app1' onClick={submithandler}>ADD</button>

      </div>
      <ul>
        <div className='search'>
          <input type='text' placeholder='search...' value={search} onChange={(e) => setsearch(e.target.value)}></input>
        </div>
        <div className='event'>
          <button onClick={Clickbtn}>click</button>
          <button onClick={Combtn}>completed</button>
          <button onClick={unCombtn}>uncompleted</button>
          <button onClick={allbtn}>all</button>

        </div>
        <div className='task'>
          {todos.map((todo, index) => (
            <li key={index}>
              <div>
                <input type='checkbox' checked={todo.completed} onChange={() => toggleComplete(index)} style={{ margin: '0px 10px 0px 0px' }}></input>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
              </div>
              <div>
                <button onClick={() => delhandler(todo.text)}>Delete</button>
                <button onClick={() => edithandler(index)}>Edit</button>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default App;