import { useState } from "react";
import ReactMarkdown from "react-markdown";
import useFetchTodos from "./hooks/useFetchTodos";
import useTodoActions from "./hooks/TodoActions";

function TodoForm() {
    const [currentNote, setCurrentNote] = useState<string>("");
    const [noteTitle, setNoteTitle] = useState<string>("");
    const [tagInput, setTagInput] = useState<string>("");
    const [noteTags, setNoteTags] = useState<string[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editId, setEditId] = useState<number | null>(null);
    const { todos, setTodos, fetchTodos } = useFetchTodos();

    const { handleSave, handleDelete, handleEdit, clearFormAfterEdit } = useTodoActions(
        todos, setTodos,
        noteTitle, currentNote, noteTags, editId,
        setEditId, setEditIndex, fetchTodos,
        setNoteTitle, setCurrentNote, setNoteTags, setTagInput
    );

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                backgroundColor: "#1e1e1e",
                overflowY: "auto",
                padding: "20px",
            }}
        >
            <div
                style={{
                    border: "2px solid #333",
                    padding: "20px",
                    borderRadius: "70px",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    width: "400px",
                    height: "auto",
                    maxHeight: "90vh",
                    overflowY: "auto",

                }}
            >
                <h2 style={{ textAlign: "center" }}>TODO APP</h2>
                {todos.map((todo, index) => (
                    <div
                        key={todo.id}
                        style={{
                            borderRadius: "10px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            border: "1px solid #ccc",
                            marginBottom: "10px",
                            padding: "10px",
                            backgroundColor: "#fdfdfd",
                            color: "#000000",
                        }}
                    >
                        <div style={{ marginRight: "10px", flex: 1 }}>
                            <strong>{todo.title}</strong>
                            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                                {todo.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            backgroundColor: "#e0e0e0",
                                            color: "#000",
                                            padding: "4px 8px",
                                            borderRadius: "15px",
                                            fontSize: "12px",
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <ReactMarkdown>{todo.note}</ReactMarkdown>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button
                                onClick={() => handleEdit(todo, index)}
                                style={{
                                    borderRadius: "10px",
                                    padding: "8px 16px",
                                    border: "1px solid #ccc",
                                    backgroundColor: "#e0e0e0",
                                    color: "#000",
                                    cursor: "pointer"
                                }}
                            >Edit</button>
                            <button
                                onClick={() => handleDelete(todo.id, index)}
                                style={{
                                    borderRadius: "10px",
                                    padding: "8px 16px",
                                    border: "1px solid #ccc",
                                    backgroundColor: "#e0e0e0",
                                    color: "#000",
                                    cursor: "pointer"
                                }}
                            >Delete</button>
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
                        placeholder="Enter note title"
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                        style={{
                            padding: "8px",
                            width: "100%",
                            borderRadius: "5px",
                            backgroundColor: "#f5f5f5",
                            border: "1px solid #999",
                            color: "#000000",
                        }}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "10px 0",
                    }}
                >
                    <input
                        placeholder="Enter tags (comma separated)"
                        value={tagInput}
                        onChange={(e) => {
                            const input = e.target.value;
                            setTagInput(input);

                            const tags = input
                                .split(",")
                                .map((tag) => tag.trim())
                                .filter((tag) => tag.length > 0);
                            setNoteTags(tags);
                        }}
                        style={{
                            padding: "8px",
                            width: "100%",
                            borderRadius: "5px",
                            backgroundColor: "#f5f5f5",
                            border: "1px solid #999",
                            color: "#000000",
                        }}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "10px 0",
                    }}
                >
                    <textarea
                        placeholder="Enter Content"
                        value={currentNote}
                        onChange={(e) => setCurrentNote(e.target.value)}
                        style={{
                            padding: "10px",
                            width: "100%",
                            height: "150px",
                            borderRadius: "5px",
                            backgroundColor: "#f5f5f5",
                            border: "1px solid #999",
                            color: "#000000",
                            resize: "none",
                            textAlign: "left",
                            verticalAlign: "top",
                        }}
                    />
                </div>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <button
                        onClick={handleSave}
                        style={{
                            borderRadius: "10px",
                            padding: "8px 16px",
                            border: "1px solid #ccc",
                            backgroundColor: "#e0e0e0",
                            color: "#000",
                            cursor: "pointer"
                        }}
                    >Save</button>
                    <button
                        onClick={clearFormAfterEdit}
                        style={{
                            borderRadius: "10px",
                            padding: "8px 16px",
                            border: "1px solid #ccc",
                            backgroundColor: "#e0e0e0",
                            color: "#000",
                            cursor: "pointer"
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodoForm;