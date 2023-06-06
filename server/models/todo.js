const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  creation_time: {
    type: String,
    default: Date.now(),
  },
  completed_time: {
    type: String,
    required: false,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
