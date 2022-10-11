import logo from "./logo.svg";
import "./App.css";
import Title from "./Component/Title";
import AddTodo from "./Component/AddTodos";
import Todo from "./Component/Todo";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  QuerySnapshot,
} from "firebase/firestore";

import { db } from "./firebase";
import { useEffect, useState } from "react";
import { cardClasses } from "@mui/material";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unpinFirst, setUnpinFirst] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todoArray = [];
      querySnapshot.forEach((doc) => {
        todoArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todoArray.sort(({ priority: a }, { priority: b }) => a - b));
      setIsLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);

  console.log("todos:", todos);

  const downMove = async (todo, followingTodo) => {
    setIsLoading(true);
    await updateDoc(doc(db, "todos", todo.id), {
      priority: followingTodo.priority,
    });
    await updateDoc(doc(db, "todos", followingTodo.id), {
      priority: todo.priority,
    });
    setIsLoading(false);
  };

  const upMove = async (todo, PrevTodo) => {
    setIsLoading(true);
    await updateDoc(doc(db, "todos", todo.id), {
      priority: PrevTodo.priority,
    });
    await updateDoc(doc(db, "todos", PrevTodo.id), {
      priority: todo.priority,
    });
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    await deleteDoc(doc(db, "todos", id));
    setIsLoading(false);
  };

  const Loading = () => (
    <div className="loader_container">
      <div className="loading">
        <div></div>
        <div></div>
      </div>
    </div>
  );

  const addPin = async (todo) => {
    setIsLoading(true);
    await updateDoc(doc(db, "todos", todo.id), {
      priority: todos[0]?.priority - 1,
      pinned: true,
    });
    setIsLoading(false);
  };

  const removePin = async (todo) => {
    setIsLoading(true);
    await updateDoc(doc(db, "todos", todo.id), {
      priority: getFirstUnpinnedTodo(todos),
      pinned: false,
    });
    setIsLoading(false);
  };

  const getFirstUnpinnedTodo = (todos) => {
    let i = 0;
    for (i; i < todos.length; i++) {
      if (!todos[i]?.pinned) {
        break;
      }
    }
    return todos[i].priority - 1;
  };
  return (
    <>
      <div className="App">
        {isLoading && <Loading />}
        <div>
          <Title />
        </div>
        <div className="todo_container">
          {todos.map((todo, index) => (
            <Todo
              key={todo.id}
              todo={todo}
              PrevTodo={todos[index - 1]}
              followingTodo={todos[index + 1]}
              upMove={upMove}
              handleDelete={handleDelete}
              downMove={downMove}
              addPin={addPin}
              removePin={removePin}
            />
          ))}
        </div>
        <div>
          <AddTodo
            prip={
              todos.length === 0 ? 1 : todos[todos.length - 1]?.priority + 1
            }
          />
        </div>
      </div>
      )
    </>
  );
}

export default App;
