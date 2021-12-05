import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import {Link} from "react-router-dom";

function Home() {
    let history = useHistory();
    return (
    <div className="page-container teacher-home-container">
      <ul className="courses-list">
      <li className="courses-item" onClick={() => {
                                        // push to CourseDetail
                                        history.push("/admin/manage/courses")
                                    }}>
      Danh sách các lớp môn học
      </li>
      <li className="courses-item" onClick={() => {
                                        // push to CourseDetail
                                        history.push("/admin/manage/teachers")
                                    }}>
      Danh sách các giảng viên
      </li>
      <li className="courses-item" onClick={() => {
                                        // push to CourseDetail
                                        history.push("/admin/manage/students")
                                    }}>
      Danh sách các sinh viên
      </li>
       </ul>
      {/* {/* <div className="card">
        <div className="card-header">
          Danh sách các lớp môn học
        </div>
        <div className="card-body">
          <h5 className="card-title">Something</h5>
          <p className="card-text">...</p>
          <Link to = "/admin/manage/courses" className="btn btn-primary">Xem danh sách các lớp môn học</Link>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          Danh sách các giảng viên
        </div>
        <div className="card-body">
          <h5 className="card-title">Something</h5>
          <p className="card-text">...</p>
          <Link to = "/admin/manage/teachers" className="btn btn-primary">Xem danh sách các giảng viên</Link>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          Danh sách các sinh viên
        </div>
        <div className="card-body">
          <h5 className="card-title">Something</h5>
          <p className="card-text">...</p>
          <Link to = "/admin/manage/students" className="btn btn-primary">Xem danh sách các sinh viên</Link>
        </div>
      </div> */}
   </div>
    )
}

export default Home
