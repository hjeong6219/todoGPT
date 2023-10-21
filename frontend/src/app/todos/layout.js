"use client";
import Header from "../../components/Header";
import { Provider } from "react-redux";
import store from "../store";
import { ReduxProvider } from "../features/todo/provider";

export default function Layout({ children }) {
  return (
    <section>
      <Provider store={store}>
        {/* <Header /> */}
        {children}
      </Provider>
    </section>
  );
}
