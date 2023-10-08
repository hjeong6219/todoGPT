import "./globals.css";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Header";

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default App;
