export const state = {
  data: {
    tasks: [],
  },

  listeners: [],

  getState() {
    return this.data;
  },

  setState(newState: Object) {
    this.data = newState;
    for (const cb of this.listeners) {
      // Recorre las funciones de listeners y las ejecuta.
      cb();
    }
  },
  subscribe(callback: (any: any) => any) {
    this.listeners.push(callback);
  },

  addTask(task: object) {
    const currentState = this.getState();
    currentState.tasks.push(task);

    this.setState(currentState);
  },
};
