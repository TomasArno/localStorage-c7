import { state } from "../state";
import "../components/list-item";

export function initHomepage() {
  const rootEl = document.querySelector(".root") as HTMLElement;

  rootEl.innerHTML = `

    <h1>TAREAS</h1>

    <form class="form">
        <input type="text" class="input" />
        <button>Añadir tarea</button>
    </form>

    <div class="task-container"></div>
  `;
  const formEl = rootEl.querySelector(".form") as HTMLFormElement;
  const inputEl = rootEl.querySelector(".input") as HTMLFormElement;
  const taskContainerEl = rootEl.querySelector(
    ".task-container"
  ) as HTMLElement;

  state.subscribe(() => {
    const lastTasks = state.getState().tasks;

    taskContainerEl.innerHTML = `
      
        ${lastTasks.map((t) => {
          return `<todo-item title="${t.title}" check="${t.check}"></todo-item>`;
        })}
      
      `;
  });

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    state.addTask({
      title: inputEl.value,
      check: "checked",
    });
  });
}
