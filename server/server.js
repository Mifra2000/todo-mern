const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
require("dotenv").config();

const port = process.env.PORT;
const db = process.env.DB;

mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to db"))
  .catch((error) => console.log(error));

const todoRouter = require("./routes/todoRoute");
app.use("/todo", todoRouter);

app.listen(5000, () => console.log("server running on port 5000"));
