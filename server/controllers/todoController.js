const Todo = require("../models/todo");

module.exports = {
  get: async (req, res) => {
    const todoList = await Todo.find();
    // console.log("todolist: ", todoList);
    res.json(todoList);
    res.set("Access-Control-Allow-Origin");
    //hello 1 2 3
  },
  post: async (req, res) => {
    console.log("req body : ", req.body);
    const todo = new Todo({
      task: req.body.task,
      creation_time: req.body.creation_time,
      completed_time: "mm:dd:yy",
    });

    // console.log(req);
    // console.log(todo);
    await todo.save();
    res.set("Access-Control-Allow-Origin");

    res.json(todo);
  },
  delete: async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    console.log(result);
    console.log("id: ", req.params.id);
    // console.log("4444444444444");
    res.set("Access-Control-Allow-Origin");
    res.json(result);
  },
  complete: async (req, res) => {
    console.log("req params: ", req.params);
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    todo.completed_time = new Date();
    todo.save();
    res.set("Access-Control-Allow-Origin");

    res.json(todo);
  },
};
