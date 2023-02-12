export const state = {
  data: {
    tasks: [],
  },

  listeners: [],

  getState() {
    return this.data;
  },
  subscribe(callback: (any: any) => any) {
    this.listeners.push(callback);
  },
  syncroWithLocalStorage() {
    const localData = localStorage.getItem("saved-state");
    this.setState(JSON.parse(localData as any));
  },
  setState(newState: Object) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("saved-state", JSON.stringify(newState));
    console.log("soy el setState, cambié", newState);
  },
  changeItemState(id, value) {
    const currentState = this.getState();
    const found = currentState.tasks.find((task) => task.id == id);
    found.checked = value;

    this.setState(currentState);
  },
  deleteTask(id) {
    const currentState = this.getState();
    const stateWithoutDeleted = currentState.tasks.filter(
      (item) => item.id != id
    );
    currentState.tasks = stateWithoutDeleted;
    state.setState(currentState);
  },
  addTask(task: object) {
    const currentState = this.getState();
    currentState.tasks.push(task);
    this.setState(currentState);
  },
};
