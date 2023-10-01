"use client";

import "./globals.css";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Header";

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
