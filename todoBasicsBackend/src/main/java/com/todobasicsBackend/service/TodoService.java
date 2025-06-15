package com.todobasicsBackend.service;

import com.todobasicsBackend.model.Todo;
import com.todobasicsBackend.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    TodoRepository repository;

    TodoService(TodoRepository repository) {
        this.repository = repository;
    }

    public List<Todo> getAllTodos() {
        return repository.findAll();
    }

    public Todo createTodo(Todo todo) {
        return repository.save(todo);
    }

    public Todo updateTodo(Integer id, Todo todo) {
        Todo existingTodo = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        existingTodo.setTitle(todo.getTitle());
        existingTodo.setDescription(todo.getDescription());
        existingTodo.setNote(todo.getNote());
        return repository.save(existingTodo);
    }

    public void deleteTodo(Integer id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Todo not found with id: " + id);
        }
        repository.deleteById(id);
    }
}
