import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import Add from "./Add";

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
    <>
      <main className="flex flex-row w-full h-screen  bg-slate-800">
        {loading === true ? (
          <span>Loading....</span>
        ) : (
          <div className="w-1/2 h-full border-2 border-red-500">
            <div className="p-20 bg-slate-700 border-2 border-red-500">
              {Array.isArray(todos) &&
                todos?.map((todo: Todo) => (
                  <div
                    key={todo._id}
                    className="bg-white p-3 rounded-lg shadow-lg"
                  >
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">
                      {todo.title}
                    </h2>
                    <hr />
                    <p className="text-gray-700">{todo.description}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="w-1/2 "></div>
      </main>
    </>
  );
}

export default App;
