import React, { useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

export default function Todo({
  todo,
  followingTodo,
  PrevTodo,
  upMove,
  handleDelete,
  downMove,
  addPin,
  removePin,
}) {
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleChange = (e) => {
    e.preventDefault();
    if (todo.complete) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };

  return (
    <div className="todo">
      <input
        style={{ textDecoration: todo.completed && "line-through" }}
        type="text"
        value={todo.title === "" ? newTitle : todo.title}
        className="list"
        onChange={handleChange}
      />
      <div>
        <button
          className={
            !todo.pinned && !PrevTodo?.pinned && PrevTodo
              ? "button-complete"
              : "disabled"
          }
          disabled={todo.pinned ? true : PrevTodo?.pinned}
          onClick={() => upMove(todo, PrevTodo)}
        >
          <ArrowDropUpIcon id="i" />
        </button>

        <button
          className={!todo.pinned && followingTodo ? "button-edit" : "disabled"}
          disabled={todo.pinned}
          onClick={() => downMove(todo, followingTodo)}
        >
          <ArrowDropDownIcon id="i" />
        </button>

        <button className="button-delete" onClick={() => handleDelete(todo.id)}>
          <CloseIcon id="i" />
        </button>
        {!todo.pinned ? (
          <button className="button-pin" onClick={() => addPin(todo)}>
            <PushPinOutlinedIcon id="i" />
          </button>
        ) : (
          <button className="button-pin" onClick={() => removePin(todo)}>
            <PushPinIcon id="i" />
          </button>
        )}
      </div>
    </div>
  );
}
