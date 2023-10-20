import { useState } from "react";
import axios from "axios";

const Add = () => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  const handleSubmit = async (e) => {
    console.log("ASDfasdf")
    e.preventDefault();
    if (!title || !description) {
      return alert("All fields are required");
    }

    try {
      axios.post("http://localhost:4000/api/v1/add", {
        title,
        description,
      });
      console.log("Add api response");
    } catch (error) {
      console.log("Add todo error api response",error);
    }
  };

  return (
    <div className="p-20 bg-slate-700">
      <form className="space-y-1" onSubmit={handleSubmit}>
        <div>
          <div className="mt-2">
            <input
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between"></div>
          <div className="mt-2">
            <textarea
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              cols="5"
              rows="3"
              placeholder="Description"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>

        <div>
          <button type="button">Add Todo</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
