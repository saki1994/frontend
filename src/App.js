import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import DailyTest from "./components/DailyTest"; 
import Home from "./components/Home"


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/"> 
          <Home /> 
              <DailyTest />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
