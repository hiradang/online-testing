import './css/admin/admin.css';
import './css/teacher/teacher.css';
import './css/student/student.css';
import AdminHome from './pages/admin/Home';
import TeacherHome from './pages/teacher/TeacherHome';
import StudentHome from './pages/student/StudentHome';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import route from './router/route';

function App() { 
  return ( 
    <div className="App">
      <Router>
        <Switch>
          {route.map((value, key) => {
            return (
              <Route path={value.path} exact component={value.component}></Route>
              )
          })}
          <Route path="/admin/manage" exact component={AdminHome}></Route>
          <Route path="/teacher/:teacherId" exact component={TeacherHome}></Route>
          <Route path="/student/:studentId" exact component={StudentHome}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
