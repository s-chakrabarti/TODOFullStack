package com.todobasicsBackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;

    private String note;

    // But by default, JPA cannot map List<String> to a single column in a table, which is what we ’re trying to do.
    // To add List in a JPA to treat it as a diff table
    // This tells JPA to create a separate table to store the tags linked by the todo_id foreign key.
    @ElementCollection
    private List<String> tags;
}
