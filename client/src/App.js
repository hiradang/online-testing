import './css/admin/admin.css';
import './css/teacher/teacher.css';
import './css/student/student.css';
import Header from './components/header';
import Footer from './components/footer';
import AdminHome from './pages/admin/Home';
import TeacherHome from './pages/teacher/TeacherHome';
import StudentHome from './pages/student/StudentHome';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import route from './router/route';
import Login from './pages/login';
import ProtectedRoute from './ProtectedRoute';
import {useState } from "react";
import RedirectRoute from './RedirectRoute';
import '@fortawesome/fontawesome-free'
import NotFoundPage from './components/NotFoundPage';
import AdminLogin from './pages/admin/Login'
import UpdatePass from './pages/updatePass';

function App() {
  
  var auth = localStorage.getItem("login");
  if (auth === null) auth = "";
  const [isAuth, setIsAuth] = useState(auth)
  const [id, setId] = useState(localStorage.getItem("id"))
  return ( 
    <div className="App">
      <Header />
      <div className="app-container">
        <Router>
          <Switch>
          <Route path="/updatePass/:id" exact component={UpdatePass}></Route>
          <RedirectRoute path="/" exact component={Login} isAuth = {isAuth} id = {id}/>
          {route.map((value, key) => {
            return (
              <ProtectedRoute path={value.path} exact component={value.component} isAuth={isAuth === value.auth}/>
              )
          })}
          <RedirectRoute path="/admin" exact component={AdminLogin} isAuth = {isAuth} id = ""/>
          <ProtectedRoute path="/admin/manage" component= {AdminHome} isAuth={isAuth}/>
          <ProtectedRoute path="/teacher/:teacherId" exact component={TeacherHome} isAuth = {isAuth === "teacher"}></ProtectedRoute>
          <ProtectedRoute path="/student/:studentId" exact component={StudentHome} isAuth={isAuth === "student"}></ProtectedRoute>
          <Route component={NotFoundPage}></Route>
          </Switch>
        </Router>
      </div>

      <Footer />
    </div>
  );
}

export default App;
