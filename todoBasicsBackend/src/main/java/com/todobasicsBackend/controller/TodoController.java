package com.todobasicsBackend.controller;

import com.todobasicsBackend.model.Todo;
import com.todobasicsBackend.service.TodoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todoBackend")
public class TodoController {

    TodoService service;

    TodoController(TodoService service) {
        this.service = service;
    }

    @GetMapping("getAllTodos/")
    public ResponseEntity<List<Todo>> getAllTodos() {
        return ResponseEntity.ok(service.getAllTodos());
    }


    @PostMapping("createTodo/")
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        return ResponseEntity.ok(service.createTodo(todo));
    }

    @PutMapping("updateTodo/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Integer id, @RequestBody Todo todo) {
        return ResponseEntity.ok(service.updateTodo(id, todo));
    }

    @DeleteMapping("deleteTodo/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable Integer id) {
        service.deleteTodo(id);
        return ResponseEntity.ok("Todo deleted successfully");
    }


}
