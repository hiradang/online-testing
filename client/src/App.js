import './css/admin/admin.css';
import './css/teacher/teacher.css';
import './css/student/student.css';
import AdminHome from './pages/admin/Home';
import TeacherHome from './pages/teacher/TeacherHome';
import StudentHome from './pages/student/StudentHome';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import route from './router/route';
import Login from './pages/login';
import ProtectedRoute from './ProtectedRoute';
import {useState } from "react";
import RedirectRoute from './RedirectRoute';

function App() {
  
  var auth = localStorage.getItem("login");
  if (auth === null) auth = "";
  const [isAuth, setIsAuth] = useState(auth)
  const [id, setId] = useState(localStorage.getItem("id"))
  return ( 
    <div className="App">
      <Router>
        <Switch>
          <RedirectRoute path="/" exact component={Login} isAuth = {isAuth} id = {id}/>
          {route.map((value, key) => {
            return (
              <Route path={value.path} exact component={value.component} />
              )
          })}

          {/* <Route path="/admin/manage" component= {AdminHome} />
          <Route path="/teacher/:teacherId" exact component={TeacherHome} ></Route>
          <Route path="/student/:studentId" exact component={StudentHome} ></Route> */}
          <ProtectedRoute path="/admin/manage" component= {AdminHome} isAuth={isAuth}/>
          <ProtectedRoute path="/teacher/:teacherId" exact component={TeacherHome} isAuth = {isAuth === "teacher"}></ProtectedRoute>
          <ProtectedRoute path="/student/:studentId" exact component={StudentHome} isAuth={isAuth === "student"}></ProtectedRoute>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
