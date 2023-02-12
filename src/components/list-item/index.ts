customElements.define(
  "todo-item",
  class TodoItem extends HTMLElement {
    id;
    title: string;
    checked: boolean;
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      const style = document.createElement("style") as HTMLElement;

      this.id = this.getAttribute("id");
      this.title = this.getAttribute("title") || "-";
      this.checked = JSON.parse(this.getAttribute("checked") as any);

      style.innerHTML = `
      * {
        box-sizing: border-box;
        margin: 0;
      }
      
      .container {
        background-color: #FFF599;
        
        width: 360px;
        height: 120px;
        
        border-radius: 4.5px;
      }
      
      .p {
        width: 260px;
        position: relative;
        top:15px;
        left:15px; 
        font-size: 25px;
      }

      .p.checked {
        text-decoration: line-through;
      }
      
      .input {
        width: 30px;
        height: 30px;
        position: relative;
        left:315px; 
      }

      .delete {
        position: relative;
        top:20px;
        left:323px;
        font-size:20px;
      }
      `;
      this.shadow.appendChild(style);
      this.render();
    }

    addCallbacks() {
      const inputEl = this.shadow.querySelector(".input") as HTMLFormElement;
      const deleteEl = this.shadow.querySelector(".delete") as HTMLElement;

      inputEl.addEventListener("click", (e: any) => {
        const isChecked = new CustomEvent("change", {
          detail: {
            id: this.id,
            value: e.target.checked,
          },
        });
        this.dispatchEvent(isChecked);
      });

      deleteEl.addEventListener("click", () => {
        const taskDeleted = new CustomEvent("deleted", {
          detail: {
            id: this.id,
          },
        });
        console.log("Deleted!!", taskDeleted);
        this.dispatchEvent(taskDeleted);
      });
    }

    render() {
      const divEl = document.createElement("div") as HTMLElement;
      divEl.classList.add("container");

      divEl.innerHTML = `
        <p class="p ${this.checked ? "checked" : ""}">${this.title}</p>
        <input class="input" type="checkbox" ${this.checked ? "checked" : ""}/>
        <div class="delete">X</div>
        `;

      this.shadow.appendChild(divEl);
      this.addCallbacks();
    }
  }
);
