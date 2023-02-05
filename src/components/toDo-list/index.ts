import "./index.css";
import { state } from "../../state";
export function toDoItem(container) {
  function render() {
    const lastState = state.getState();
    const nombre = lastState.list[lastState.list.length - 1].task;
    console.log(lastState);

    const div = document.createElement("div");
    div.innerHTML = `
          <div class="task-container">
              <label class="label">${nombre}</label>
              <input class="input" type="checkbox" ${""} />
          </div>
          `;

    // const taskCont = div.querySelector(".task-container");
    // const input = taskCont?.querySelector(".input");
    // input?.addEventListener("click", () => {
    //   alert("hola");
    // });

    container.appendChild(div);
  }
  render();
}
