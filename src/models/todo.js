export class Todo {
  static #currentIndex = 0;

  constructor(index, value, done) {
    this.index = index;
    this.value = value;
    this.done = done;
  }

  static createTodo(value, done) {
    Todo.#currentIndex++;
    return new Todo(Todo.#currentIndex, value, done);
  }
}
