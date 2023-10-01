import { Provider } from "react-redux";
import AppLayout from "./pages/AppLayout";
import store from "./store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import CalendarPage from "./pages/CalendarPage";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoPage />;
    </QueryClientProvider>
  );
}

export default App;
