import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddTodo({ prip }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(prip);
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db, "todos"), {
        title,
        completed: false,
        priority: prip,
        pinned: false,
      });
      setTitle("");
      setPriority(priority + 1);
    }
  };

  return (
    <form onSubmit={handlesubmit}>
      <div className="input_container">
        <input
          type="text"
          placeholder="Enter Todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="btn_container">
        <button>Add</button>
      </div>
    </form>
  );
}
