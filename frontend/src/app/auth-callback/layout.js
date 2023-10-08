"use client";

import { Provider } from "react-redux";
import Header from "../../components/Header";
import { ReduxProvider } from "../features/todo/provider";
import store from "../store";

export default function RootLayout({ children }) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
