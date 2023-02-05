import "./index.css";
import { toDoItem } from "../../components/toDo-list";
import { state } from "../../state";

export function welcome(container) {
  const div = document.createElement("div");
  div.innerHTML = `
    <form class ="form">
      <input class="input" type="text"/>
      <button class="button">Agregar</button>
    <form>
  `;

  const form = div.querySelector(".form") as HTMLFormElement;
  const input = form.querySelector(".input") as HTMLFormElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    state.addItem({
      id: state.getState().list.length,
      task: input.value,
    });
  });

  state.subscribe(() => {
    toDoItem(container);
  });

  container.appendChild(div);
}
