import './css/admin/admin.css';
import Home from './pages/admin/Home';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Students from './pages/admin/Students'
import AddStudent from './pages/admin/AddStudent';
import Teacher from './pages/admin/Teacher';
import Courses from './pages/admin/Courses';
import StudentInfo from './pages/admin/StudentInfo';
import TeacherInfo from './pages/admin/TeacherInfo';
import CourseInfo from './pages/admin/CourseInfo';
function App() {
  
  return ( 
    <div className="App">
      <Router>
        <Switch>
          <Route path="/admin/manage" exact component={Home}></Route>
          <Route path="/admin/manage/students" exact component={Students}></Route>
          <Route path="/admin/manage/students/add" exact component={AddStudent}></Route>
          <Route path="/admin/manage/teachers" exact component={Teacher}></Route>
          <Route path="/admin/manage/courses" exact component={Courses}></Route>
          <Route path="/admin/manage/students/:id" exact component={StudentInfo}></Route>
          <Route path="/admin/manage/teachers/:id" exact component={TeacherInfo}></Route>
          <Route path="/admin/manage/courses/:id" exact component={CourseInfo}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
