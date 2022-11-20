import { AppRouter } from "./router";
import { BrowserRouter } from "react-router-dom";
import {store} from "./store";
import {Provider} from "react-redux";

export const CalendarApp = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
};
