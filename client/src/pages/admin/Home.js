import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

function Home() {
    
    return (
    <div className="App">
      <div className="card">
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
          Danh sách các giáo viên
        </div>
        <div className="card-body">
          <h5 className="card-title">Something</h5>
          <p className="card-text">...</p>
          <Link to = "/admin/manage/teachers" className="btn btn-primary">Xem danh sách các giáo viên</Link>
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
      </div>
    </div>
    )
}

export default Home
