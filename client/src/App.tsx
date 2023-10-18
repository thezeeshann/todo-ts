import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  interface Todo {
    _id: number;
    title: string;
    description: string;
    done: boolean;
  }

  const [todos, setTods] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const getTodo = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/api/v1/todos");
      setTods(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTodo();
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
