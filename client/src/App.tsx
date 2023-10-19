import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

interface Todo {
  _id: number;
  title: string;
  description: string;
  done: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<{ title: string; description: string }>({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  const getTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Todo[]>("http://localhost:4000/api/v1/todos");
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleTodoChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const addTodo = async () => {
    try {
      const response = await axios.post<Todo>("http://localhost:4000/api/v1/todos", {
        ...newTodo,
        done: false,
      });
      setTodos([...todos, response.data]);
      setNewTodo({ title: "", description: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTodo = async (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo._id === id) {
        todo.done = !todo.done;
      }
      return todo;
    });

    try {
      await axios.put(`http://localhost:4000/api/v1/todos/${id}`, { done: updatedTodos.find((todo) => todo._id === id)?.done });
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="bg-slate-800 min-h-screen flex items-center justify-center">
      <div className="w-4/5 bg-white rounded-lg shadow-lg p-4 md:p-8 lg:p-12 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">New Todo</h1>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newTodo.title}
              onChange={handleTodoChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              placeholder="Description"
              value={newTodo.description}
              onChange={handleTodoChange}
              className="w-full p-2 border rounded h-32"
            />
          </div>
          <button onClick={addTodo} className="bg-slate-800 text-white rounded p-2">
            Add Todo
          </button>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          {loading ? (
            <span>Loading....</span>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Todos</h2>
              {todos.length === 0 ? (
                <p className="italic text-gray-400">Nothing to do...</p>
              ) : (
                <ul className="list-disc pl-6">
                  {todos.map((todo) => (
                    <li
                      key={todo._id}
                      style={{ textDecoration: todo.done ? "line-through" : "none" }}
                      onClick={() => toggleTodo(todo._id)}
                    >
                      <h3 className="text-lg font-semibold text-gray-800">{todo.title}</h3>
                      <p className="text-gray-700">{todo.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
