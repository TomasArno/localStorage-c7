export const state = {
  data: {
    list: [],
  },
  listeners: [], // los callbacks
  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    // modifica this.data (el state) e invoca los callbacks
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
    // recibe callbacks para ser avisados posteriormente
  },
  addItem(item) {
    const cs = this.getState();
    cs.list.push(item);
    this.setState(cs);

    // suma el nuevo item a la lista
  },
};
