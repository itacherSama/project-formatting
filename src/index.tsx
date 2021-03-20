import ReactDOM from "react-dom";
import history from "./router/history";
import router from "./router/router";
import * as serviceWorker from "./serviceWorkerRegistration";

import "./index.css";

const render = async (location: any) => {
  const element: any = await router.resolve(location);
  ReactDOM.render(element, document.getElementById("root"));
};

render(history.location);
history.listen(render);

serviceWorker.register();
