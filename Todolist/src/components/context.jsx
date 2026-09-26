import { useEffect, useState } from "react";

export default function Content() {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    // Load todos from localStorage when app starts
    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");

        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    // Save todos whenever todos change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // Add Todo
    const addTodo = () => {
        if (task.trim() === "") {
            alert("Enter a task inside the input field");
            return;
        }

        const newTodo = {
            id: Date.now(),
            text: task.trim(),
            completed: false
        };

        setTodos([...todos, newTodo]);
        setTask("");
    };

    // Delete Todo
    const deleteTodo = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    // Complete / Undo Todo
    const toggleTodo = (id) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed
                };
            }

            return todo;
        });

        setTodos(newTodos);
    };

    // Start editing
    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditText(todo.text);
    };

    // Save edited Todo
    const saveEdit = (id) => {
        if (editText.trim() === "") {
            alert("Task cannot be empty");
            return;
        }

        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    text: editText.trim()
                };
            }

            return todo;
        });

        setTodos(newTodos);
        setEditingId(null);
        setEditText("");
    };

    // Filter Todos
    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") {
            return !todo.completed;
        }

        if (filter === "completed") {
            return todo.completed;
        }

        return true;
    });

    // Clear completed Todos
    const clearCompleted = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    };

    const remainingTodos = todos.filter(
        (todo) => !todo.completed
    ).length;

    return (
        <div className="todo-container">
            <h1>TODO LIST</h1>

            {/* Add Todo */}
            <div className="add-section">
                <input
                    type="text"
                    value={task}
                    onChange={(event) =>
                        setTask(event.target.value)
                    }
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            addTodo();
                        }
                    }}
                    placeholder="Enter your task"
                />

                <button onClick={addTodo}>
                    ADD
                </button>
            </div>

            {/* Filter Buttons */}
            <div className="filters">
                <button
                    onClick={() => setFilter("all")}
                    className={filter === "all" ? "active-filter" : ""}
                >
                    All
                </button>

                <button
                    onClick={() => setFilter("active")}
                    className={filter === "active" ? "active-filter" : ""}
                >
                    Active
                </button>

                <button
                    onClick={() => setFilter("completed")}
                    className={
                        filter === "completed"
                            ? "active-filter"
                            : ""
                    }
                >
                    Completed
                </button>
            </div>

            {/* Todo Count */}
            <h2>MY TODOS</h2>

            <p>
                {remainingTodos} task
                {remainingTodos !== 1 ? "s" : ""} remaining
            </p>

            {/* Todo List */}
            <ul>
                {filteredTodos.length === 0 ? (
                    <li>No todos found</li>
                ) : (
                    filteredTodos.map((todo) => (
                        <li key={todo.id}>
                            {editingId === todo.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(event) =>
                                            setEditText(
                                                event.target.value
                                            )
                                        }
                                    />

                                    <button
                                        onClick={() =>
                                            saveEdit(todo.id)
                                        }
                                    >
                                        Save
                                    </button>

                                    <button
                                        onClick={() => {
                                            setEditingId(null);
                                            setEditText("");
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span
                                        className={
                                            todo.completed
                                                ? "completed"
                                                : ""
                                        }
                                    >
                                        {todo.text}
                                    </span>

                                    <button
                                        onClick={() =>
                                            toggleTodo(todo.id)
                                        }
                                    >
                                        {todo.completed
                                            ? "Undo"
                                            : "Complete"}
                                    </button>

                                    <button
                                        onClick={() =>
                                            startEdit(todo)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteTodo(todo.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </li>
                    ))
                )}
            </ul>

            {/* Clear Completed */}
            {todos.some((todo) => todo.completed) && (
                <button onClick={clearCompleted}>
                    Clear Completed
                </button>
            )}
        </div>
    );
}