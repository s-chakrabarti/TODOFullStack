import {useEffect, useState} from "react";

import axios from "axios";

export type Todo = {
    id: number;
    title: string;
    note: string;
    tags: string[];
};


const useFetchTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const fetchTodos = () => {
        axios
            .get("http://localhost:8080/todoBackend/getAllTodos/")
            .then((response) => setTodos(response.status === 200 ? response.data : []))
            .catch((error) => console.error("Error fetching todos:", error));
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return { todos, setTodos, fetchTodos };
};

export default useFetchTodos;
