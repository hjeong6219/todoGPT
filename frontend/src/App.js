import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import TodoPage from "./pages/TodoPage";
import Sidebar from "./components/Sidebar";
import Route from "./components/Route";
import { NavigationProvider } from "./context/navigation";

function App() {
    return (
        <NavigationProvider>
            <div className="container mx-auto grid grid-cols-6 gap-5 mt-4">
                <Sidebar />
                <div className="col-span-5">
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/todo">
                        <TodoPage />
                    </Route>
                    <Route path="/">
                        <WelcomePage />
                    </Route>
                </div>
            </div>
        </NavigationProvider>
    );
  }
  export default App;
