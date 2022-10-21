import { Injectable, NotFoundException } from '@nestjs/common';

import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del Alma', done: false },
    { id: 2, description: 'Piedra del Espacio', done: false },
    { id: 3, description: 'Piedra del Poder', done: false },
  ];

  findAll(statusArgs: StatusArgs): Todo[] {
    const { status } = statusArgs;
    if (status !== undefined)
      return this.todos.filter((todo) => todo.done === status);
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    return todo;
  }

  create({ description }: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    todo.description = description;
    return todo;
  }

  update({ id, description, done }: UpdateTodoInput): Todo {
    const todoToUpdate = this.findOne(id);
    if (description) todoToUpdate.description = description;
    if (done !== undefined) todoToUpdate.done = done;
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) return todoToUpdate;
      return todo;
    });
    return todoToUpdate;
  }

  delete(id: number) {
    this.findOne(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return true;
  }
}
