import './css/admin/admin.css';
import Home from './pages/admin/Home';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import route from './router/route';

function App() {
  
  return ( 
    <div className="App">
        <Router>
        <Switch>
          <Route path="/admin/manage" exact component={Home}></Route>
          {route.map((value, key) => {
            return (
              <Route path={value.path} exact component={value.component}></Route>
            )
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
