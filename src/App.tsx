import { store } from "./store/configureStore";
import AppComponent from "./components/App";
import Styles from "./styles/styles.module.css";
import { Provider } from "react-redux";
import React from "react";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppComponent />
    </Provider>
  );
};

export default App;
