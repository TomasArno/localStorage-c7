import { initWelcome } from "./pages/page-a";
import { initForm } from "./pages/page-b";

const routes = [
  {
    path: /\/welcome/,
    component: initWelcome,
  },
  {
    path: /\/form/,
    component: initForm,
  },
];

export function initRouter(compContainer: Element) {
  function goTo(path) {
    history.pushState({}, "", path);
    handleRoute(path);
  }
  function handleRoute(route: string) {
    console.log(`El  handleRoute recibio una ruta: ${route}`);

    for (const r of routes) {
      if (r.path.test(route)) {
        const el = r.component({ goTo: goTo });

        if (compContainer.firstChild) {
          compContainer.firstChild.remove();
        }
        compContainer.appendChild(el);
      }
    }
  }
  if (location.pathname == "/") {
    goTo("/welcome");
  } else {
    handleRoute(location.pathname);
  }

  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}
