import "./App.css";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useLocation,
} from "react-router-dom";
import Candidates from "./Candidates";
import Candidate from "./Candidate";

function App() {
  return (
    <Router>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "4rem",
        }}
      >
        <Switch>
          <Route exact strict path="/">
            <Candidates />
          </Route>
          <Route
            exact
            strict
            path="/:candidate"
            render={(props) => <Candidate {...props} />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
