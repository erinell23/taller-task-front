'use client'
import { useEffect, useState } from "react";
import { Check, Trash2 } from "lucide-react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  async function listTask() {
    console.log('hola');
    const response = await fetch('https://jvxqta5ha5.execute-api.us-east-1.amazonaws.com/dev/task')
    const tasks = await response.json()
    console.log('respuesta', tasks);
    setTasks(tasks)
  }

  useEffect(() => {
    listTask()
  }, [])


  const addTask = () => {
    if (task.trim() === "") return;
    fetch('https://jvxqta5ha5.execute-api.us-east-1.amazonaws.com/dev/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: task,
        estado: true
      })
    }).then(() => {
      setTask("");
      listTask()
    })

  };

  const toggleTask = (id, estado) => {
    fetch('https://jvxqta5ha5.execute-api.us-east-1.amazonaws.com/dev/task/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado })
    }).then(() => {
      listTask()
    })
  };

  const removeTask = (id) => {
    fetch('https://jvxqta5ha5.execute-api.us-east-1.amazonaws.com/dev/task/' + id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }).then(() => {
      listTask()
    })
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Lista de Tareas
            </h2>
          </div>

          <div className="flex mb-4">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Nueva tarea..."
              className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={addTask}
              className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Agregar
            </button>
          </div>

          <ul>
            {tasks.map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center p-2 mb-2 border rounded-md dark:border-gray-600"
              >
                <span
                  className={`flex-1 ${!t.estado ? "line-through text-gray-500" : "text-gray-900 dark:text-gray-100"}`}
                >
                  {t.nombre}
                </span>
                <button
                  onClick={() => toggleTask(t.id, !t.estado)}
                  className="p-1 mr-2 text-green-600 hover:text-green-800"
                >
                  <Check size={20} />
                </button>
                <button
                  onClick={() => removeTask(t.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </li>
            ))}
          </ul>
          {tasks.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
              No hay tareas pendientes.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
