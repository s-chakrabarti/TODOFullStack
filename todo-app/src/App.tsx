// import { useState } from "react";

import {useState, useEffect} from "react";
import axios from "axios";


type Todo = {
    id: number;
    title: string;
    description: string;
    note: string;
};


function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [currentNote, setCurrentNote] = useState<string>("");
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editId, setEditId] = useState<number | null>(null);


    useEffect(() => {
        fetchTodos();
    }, []);


    const fetchTodos = () => {
        axios
            .get("http://localhost:8080/todoBackend/getAllTodos/")
            .then((response) => setTodos(response.status === 200 ? response.data : []))
            .catch((error) => console.error("Error fetching todos:", error));
    };


    const handleSave = () => {
        if (currentNote === "") return;


        const payload = {
            title: currentNote,
            description: "",
            note: currentNote,
        };


        if (editId !== null) {
            axios
                .put(`http://localhost:8080/todoBackend/updateTodo/${editId}`, payload)
                .then(fetchTodos)
                .catch(console.error);
            setEditId(null);
        } else {
            axios
                .post("http://localhost:8080/todoBackend/createTodo/", payload)
                .then(fetchTodos)
                .catch(console.error);
        }


        setCurrentNote("");
    };


    const handleDelete = (id: number, index: number) => {
        axios
            .delete(`http://localhost:8080/todoBackend/deleteTodo/${id}`)
            .then(() => {
                const newTodos = todos.filter((_, i) => i !== index);
                setTodos(newTodos);
                if (editIndex === index) {
                    setCurrentNote("");
                    setEditIndex(null);
                    setEditId(null);
                }
            })
            .catch(console.error);
    };


    const handleEdit = (todo: Todo, index: number) => {
        setCurrentNote(todo.note);
        setEditId(todo.id);
        setEditIndex(index);
    };

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                backgroundColor: "#1e1e1e",
            }}
        >
            <div
                style={{
                    border: "2px solid #333",
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#1e1e1e",
                    width: "400px",
                }}
            >
                <h2 style={{textAlign: "center"}}>TODO APP</h2>
                {todos.map((todo, index) => (
                    <div
                        key={todo.id}
                        style={{
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            marginBottom: "10px",
                            padding: "10px",
                            justifyContent: "space-between",
                            backgroundColor: "#1e1e1e",
                        }}
                    >
                        <div style={{marginRight: "10px", flex: 1}}>{todo.note}</div>
                        <div style={{display: "flex", gap: "10px"}}>
                            <button onClick={() => handleEdit(todo, index)}>Edit</button>
                            <button onClick={() => handleDelete(todo.id, index)}>Delete</button>
                        </div>
                    </div>
                ))}


                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "10px 0",
                    }}
                >
                    <input
                        placeholder="Enter new Note"
                        value={currentNote}
                        onChange={(e) => setCurrentNote(e.target.value)}
                        style={{
                            padding: "8px",
                            width: "100%",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />
                </div>
                <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
                    <button onClick={handleSave}>Save</button>
                    <button
                        onClick={() => {
                            setCurrentNote("");
                            setEditIndex(null);
                            setEditId(null);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
