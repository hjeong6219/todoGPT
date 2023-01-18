import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";

const el = document.getElementById("root");
const root = createRoot(el);

root.render(<App />);
