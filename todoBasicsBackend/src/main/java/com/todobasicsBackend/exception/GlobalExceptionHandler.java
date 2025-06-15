package com.todobasicsBackend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ValidationFailedException.class)
    public ResponseEntity<String> handleValidationException(ValidationFailedException exception) {
        return ResponseEntity.badRequest().body(exception.getMessage());
    }
}
