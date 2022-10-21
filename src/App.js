import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import "./styles.css";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
});

export default function App() {
  const [todo, setTodo] = useState("");

  const sendToDo = async (payload) => {
    const response = await api.post("/todos", payload);
    return response.data;
  };

  const { mutate, isLoading, status, isError, isSuccess } = useMutation(
    sendToDo,
    {
      onSuccess(data) {
        console.log("Succesful", { data });
      },
      onError(error) {
        console.log("Failed", error);
      }
    }
  );

  console.log("status:", status);

  function addTodo(e) {
    e.preventDefault();
    mutate({
      userId: 1,
      title: todo,
      completed: false
    });
  }

  return (
    <div className="App">
      <h1>useMutations() Hook</h1>
      <h2>Create, update or delete data</h2>
      <h3>Add a new todo</h3>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button>Add todo</button>
      </form>
      {isLoading && <p>Making request...</p>}
      {isSuccess && <p>Todo added!</p>}
      {isError && <p>There was an error!</p>}
    </div>
  );
}
