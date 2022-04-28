import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import { STRINGS } from "./strings.js";
import { Todo } from "./models/todo.js";
import { todoItems } from "./store/todos.js";
import { StatusCodes } from "http-status-codes";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send(STRINGS.HELLO_WORLD));

app.get("/task", (req, res) => {
  return res.json({ data: todoItems, status: STRINGS.STATUS.SUCCESS });
});

app.post("/task", (req, res) => {
  todoItems.push(Todo.createTodo(req.body.value, false));
  return res.json({ data: todoItems, status: STRINGS.STATUS.SUCCESS });
});

app.delete("/task/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(StatusCodes.BAD_REQUEST);
    return res.json({ status: STRINGS.INVALID_ID });
  }
  const todoItems = todoItems.filter((d) => d.index !== +req.params.id);
  return res.json({ data: todoItems, status: STRINGS.STATUS.SUCCESS });
});

app.patch("/task/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(StatusCodes.BAD_REQUEST);
    return res.json({ status: STRINGS.INVALID_ID });
  }
  const todoItem = todoItems.find((d) => d.index === +req.params.id);
  if (todoItem === undefined) {
    res.status(StatusCodes.NOT_FOUND);
    return res.json({ status: STRINGS.NOT_FOUND });
  }
  todoItem.done = req.body.done;
  return res.json({ data: todoItems, status: STRINGS.STATUS.SUCCESS });
});

app.listen(process.env.LISTEN_PORT, () => console.log(STRINGS.APP_START));
