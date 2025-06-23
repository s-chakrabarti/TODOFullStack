import axios from "axios";
import {Todo} from "./useFetchTodos";

const useTodoActions = (
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    noteTitle: string,
    currentNote: string,
    noteTags: string[],
    editId: number | null,
    setEditId: React.Dispatch<React.SetStateAction<number | null>>,
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>,
    fetchTodos: () => void,
    setNoteTitle: React.Dispatch<React.SetStateAction<string>>,
    setCurrentNote: React.Dispatch<React.SetStateAction<string>>,
    setNoteTags: React.Dispatch<React.SetStateAction<string[]>>,
    setTagInput: React.Dispatch<React.SetStateAction<string>>,
) =>
{
    const handleSave = () => {
        if (currentNote.trim() === "" && noteTitle.trim() === "") return;

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

        // clearForm();
        clearFormAfterEdit();
    };

    const handleDelete = (id: number, index: number) => {
        axios
            .delete(`http://localhost:8080/todoBackend/deleteTodo/${id}`)
            .then(() => {
                const newTodos = todos.filter((_, i) => i !== index);
                setTodos(newTodos);
                // clearForm();
                clearFormAfterEdit();
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

    }


    // Clear the form after editing
    const clearFormAfterEdit = () => {
        setNoteTitle("");
        setCurrentNote("");
        setTagInput("");
        setNoteTags([]);
        setEditIndex(null);
        setEditId(null);
    };

    return {handleSave, handleDelete, handleEdit, clearFormAfterEdit};
}
;

export default useTodoActions;