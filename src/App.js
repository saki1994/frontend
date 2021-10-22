import NewInput from "./components/NewInput";  
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import DailyTest from "./components/DailyTest";


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/"> 
              <NewInput />  
              <DailyTest />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
