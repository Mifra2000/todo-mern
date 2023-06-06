import React, { useState, useEffect, useCallback } from "react";

import "../App.css";
import "@fortawesome/fontawesome-free/css/all.css";

const API_BASE = "http://localhost:5000";

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    getTodos();
    console.log("tasks: ", tasks);
  }, []);

  const handleChange = (task_id) => {
    const updatedTasks = tasks.map((task) => {
      if (task._id == task_id) {
        console.log("task: ", task);

        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });
    console.log("updated tasks: ", updatedTasks);
    setTasks(updatedTasks);
    completedTask(task_id);
  };

  const completedTask = async (id) => {
    console.log("id: ", id);
    await fetch(API_BASE + "/todo/complete/" + id, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const getTodos = useCallback(() => {
    fetch(API_BASE + "/todo")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setChecked(data.completed);
      })
      .catch((err) => console.log(err));

    // console.log("response: ", response);
  }, []);

  const deleteTask = (id) => {
    const data = fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTasks((tasks) => tasks.filter((task) => task._id != id));
  };

  const addTask = () => {
    console.log("new task: ", newTask);
    if (newTask != "") {
      console.log("inside if");
      fetch(API_BASE + "/todo/new", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          task: newTask,
        }),
      }).then((res) => res.json());
      setNewTask("");
      getTodos();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && newTask != "") {
      // Call your function here
      console.log("Enter key pressed");
      console.log("inside if");
      fetch(API_BASE + "/todo/new", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          task: newTask,
        }),
      }).then((res) => res.json());
      setNewTask("");
      getTodos();
    }
  };

  return (
    <div className="main">
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="button" type="button" onClick={addTask}>
          Add
        </button>
      </div>
      {tasks.map((task) => (
        <div
          className={"todo" + (task.completed ? " todo-is-complete" : "")}
          key={task._id}
        >
          <div className="inner_container">
            <input
              type="checkbox"
              className="checkbox"
              checked={task.completed}
              onChange={() => handleChange(task._id)}
            />
            <div className="text">{task.task}</div>
          </div>

          <i
            className="fa fa-trash"
            aria-hidden="true"
            onClick={() => deleteTask(task._id)}
          ></i>
        </div>
      ))}
    </div>
  );
};

export default Main;
