// Regular React imports
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// Redux imports
import { Provider } from "react-redux";
import store from "./store/index";
// ContextAPI imports
import BBB from "./context"

ReactDOM.render(
  <BBB>
    <Provider store={store}>
      <App />
    </Provider>
  </BBB>,
  document.getElementById("root")
);
