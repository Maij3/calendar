import { AppRouter } from "./router";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        {/* <BrowserRouter> */}
        <AppRouter />
        {/* </BrowserRouter> */}
      </HashRouter>
    </Provider>
  );
};
