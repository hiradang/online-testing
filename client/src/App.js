import './App.css';
import Home from './pages/Home';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Student from './pages/Student'
import AddStudent from './pages/AddStudent';
import Teacher from './pages/Teacher';
import Courses from './pages/Courses';
function App() {
  
  return ( 
    <div className="App">
      <Router>
        <Switch>
          <Route path="/admin/manage" exact component={Home}></Route>
          <Route path="/admin/manage/students" exact component={Student}></Route>
          <Route path="/admin/manage/students/add" exact component={AddStudent}></Route>
          <Route path="/admin/manage/teachers" exact component={Teacher}></Route>
          <Route path="/admin/manage/courses" exact component={Courses}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
