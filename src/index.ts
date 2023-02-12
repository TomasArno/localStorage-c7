import { initHomepage } from "./pages";
import { state } from "./state";
import "./components/list-item";
(function main() {
  state.syncroWithLocalStorage();
  initHomepage();
})();
