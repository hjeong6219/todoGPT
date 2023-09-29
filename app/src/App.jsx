import { Provider } from "react-redux";
import AppLayout from "./pages/AppLayout";
import store from "./store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import CalendarPage from "./pages/CalendarPage";
import Header from "./components/Header";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/settings" element={<AppLayout />} />
          <Route path="/login" element={<AppLayout />} />
          <Route path="/forgot-password" element={<AppLayout />} />
          <Route path="/reset-password" element={<AppLayout />} />
          <Route path="/404" element={<AppLayout />} />
          <Route path="*" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
