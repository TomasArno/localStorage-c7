customElements.define(
  "todo-item",
  class TodoItem extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
    }

    connectedCallback() {
      this.render();
    }

    render() {
      const divEl = document.createElement("div") as HTMLElement;
      const style = document.createElement("style") as HTMLElement;

      const title = this.getAttribute("title");
      const check = this.getAttribute("check");
      divEl.classList.add("container");

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
          font-size: 30px;
        }
        
        .input {
          width: 30px;
          height: 30px;
          position: relative;
          top:0px;
          left:320px; 
        }
        
        `;

      divEl.innerHTML = `
        <p class="p">${title}</p>
        <input class="input" type="checkbox" />
        `;

      const inputEl = divEl.querySelector(".input") as HTMLFormElement;

      this.shadow.appendChild(style);
      this.shadow.appendChild(divEl);
    }
  }
);

// function throwEvent(inputEl) {
//   const isChecked = new CustomEvent("checked", {
//     detail: {
//       check: "checked",
//     },
//   });

//   inputEl.dispatchEvent(isChecked);
// }
