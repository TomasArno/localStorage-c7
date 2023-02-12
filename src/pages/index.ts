import { state } from "../state";
import "./index.css";
import "../components/list-item";

export function initHomepage() {
  const rootEl = document.querySelector(".root") as HTMLElement;
  const divEl = document.createElement("div") as HTMLElement;

  divEl.innerHTML = `
  
  <h1>TAREAS</h1>
  
  <form class="form">
  <input type="text" class="input" />
  <button>Añadir tarea</button>
  </form>
  
  <div class="task-container"></div>
  `;
  const formEl = divEl.querySelector(".form") as HTMLFormElement;
  const inputEl = divEl.querySelector(".input") as HTMLFormElement;
  const taskContainerEl = divEl.querySelector(".task-container") as HTMLElement;

  const currentTasks = state.getState().tasks;

  function createTasks(tasks) {
    taskContainerEl.innerHTML = "";

    for (const task of tasks) {
      const todoItemEl = document.createElement("todo-item");
      todoItemEl.className = "todo-item";
      todoItemEl.setAttribute("title", task.title);
      todoItemEl.setAttribute("id", task.id);
      if (task.checked) {
        todoItemEl.setAttribute("checked", "true");
      }

      todoItemEl.addEventListener("change", (e: any) => {
        state.changeItemState(e.detail.id, e.detail.value);
      });

      todoItemEl.addEventListener("deleted", (e: any) => {
        state.deleteTask(e.detail.id);
      });

      taskContainerEl.appendChild(todoItemEl);
    }
  }

  state.subscribe(() => {
    createTasks(state.getState().tasks);
  });
  createTasks(currentTasks);

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const currentTasks = state.getState().tasks;

    state.addTask({
      id: currentTasks.length + 1,
      title: inputEl.value,
      checked: false,
    });
  });

  rootEl.appendChild(divEl);
}
