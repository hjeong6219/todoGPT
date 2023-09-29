import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "../components/Header";

function Root() {
  return (
    <div>
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/">
            <div>todo</div>
          </Route>
          <Route path="/calendar">
            <div>calendar</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Root;
