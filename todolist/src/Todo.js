import React, { useState, useEffect } from "react";
import { Body } from "./components/Body.styled";
import { Input } from "./components/Input.styled";
import { AddB } from "./components/AddB.styled";
import { Content } from "./components/Content.styled";

function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(storedList);
    }
  }, []);
  const addTask = (e) => {
    if (task) {
      const newTask = {
        id: new Date().getTime().toString(),
        data: task,
        completed: false,
      };

      setTasks([...tasks, newTask]);

      localStorage.setItem("localTasks", JSON.stringify(tasks));
      setTask("");
    }

    if (editId) {
      const updatedTasks = tasks.map((t) =>
        t.id === editId ? { ...t, data: task } : t
      );
      setTasks(updatedTasks);
      localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
      setEditId(0);
      return;
    }
  };

  const handleEdit = (index) => {
    const editTask = tasks.find((i) => i.id === index.id);
    setTask(editTask.data);
    setEditId(index.id);
  };

  const handleDelete = (task) => {
    const deleted = tasks.filter((t) => t.id !== task.id);
    setTasks(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted));
  };

  const toggleComplete = (taskToToggle) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskToToggle.id) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
    localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
  };

  return (
    <Body>
      <div>
        <Input
          name="task"
          type="text"
          value={task}
          placeholder="Enter Data"
          onChange={(e) => setTask(e.target.value)}
        />

        <AddB onClick={addTask}>Add</AddB>

        {tasks.map((task) => (
          <React.Fragment key={task.id}>
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task)}
              />
              <label
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                <Content className="content">{task.data}</Content>
              </label>
              <AddB onClick={() => handleDelete(task)}>Delete</AddB>
              <AddB onClick={() => handleEdit(task)}>Edit</AddB>
            </div>
          </React.Fragment>
        ))}
      </div>
    </Body>
  );
}

export default Todo;
