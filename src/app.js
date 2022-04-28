import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import { strings } from "./strings.js";
import { Todo } from "./models/todo.js";
import { todoItems } from "./store/todos.js";
import { StatusCodes } from "http-status-codes";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send(strings.helloWorld));

app.get("/task", (req, res) => {
  return res.json({ data: todoItems, status: "success" });
});

app.post("/task", (req, res) => {
  todoItems.push(Todo.createTodo(req.body.value, false));
  return res.json({ data: todoItems, status: "success" });
});

app.delete("/task/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(StatusCodes.BAD_REQUEST);
    return res.json({ status: strings.invalidId });
  }
  const todoItems = todoItems.filter((d) => d.index !== +req.params.id);
  return res.json({ data: todoItems, status: "success" });
});

app.patch("/task/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(StatusCodes.BAD_REQUEST);
    return res.json({ status: strings.invalidId });
  }
  const todoItem = todoItems.find((d) => d.index === +req.params.id);
  if (todoItem === undefined) {
    res.status(StatusCodes.NOT_FOUND);
    return res.json({ status: strings.notFound });
  }
  todoItem.done = req.body.done;
  return res.json({ data: todoItems, status: "success" });
});

app.listen(process.env.LISTEN_PORT, () => console.log(strings.appStart));
