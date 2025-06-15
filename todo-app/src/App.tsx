import {useState, useEffect} from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";


type Todo = {
    id: number;
    title: string;
    note: string;
    tags: string[];
};


function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [currentNote, setCurrentNote] = useState<string>("");
    const [noteTitle, setNoteTitle] = useState<string>("");
    const [tagInput, setTagInput] = useState<string>("");
    const [noteTags, setNoteTags] = useState<string[]>([]);
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
            title: noteTitle,
            note: currentNote,
            tags: noteTags,
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


        clearForm();
    };


    const handleDelete = (id: number, index: number) => {
        axios
            .delete(`http://localhost:8080/todoBackend/deleteTodo/${id}`)
            .then(() => {
                const newTodos = todos.filter((_, i) => i !== index);
                setTodos(newTodos);
                if (editIndex === index) {
                    clearForm();
                }
            })
            .catch(console.error);
    };


    const handleEdit = (todo: Todo, index: number) => {
        setNoteTitle(todo.title);
        setCurrentNote(todo.note);
        setEditId(todo.id);
        setEditIndex(index);
        setNoteTags(todo.tags);
        setTagInput(todo.tags.join(", "));
    };


    const clearForm = () => {
        setCurrentNote("");
        setNoteTitle("");
        setTagInput("");
        setNoteTags([]);
        setEditIndex(null);
        setEditId(null);
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
                    backgroundColor: "#ffffff",
                    color: "#000000",
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
                            flexDirection: "column",
                            gap: "8px",
                            border: "1px solid #ccc",
                            marginBottom: "10px",
                            padding: "10px",
                            backgroundColor: "#fdfdfd",
                            color: "#000000",
                        }}
                    >
                        <div style={{marginRight: "10px", flex: 1}}>
                            <strong>{todo.title}</strong>
                            <div style={{display: "flex", gap: "5px", flexWrap: "wrap"}}>
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
                <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
                    <button onClick={handleSave}>Save</button>
                    <button
                        onClick={() => {
                            clearForm();
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
