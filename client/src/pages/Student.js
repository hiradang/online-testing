import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

function Student() {
    const [listStudent, setListStudent] = useState([]);
    useEffect(()=> {
        axios.get("http://localhost:3001/admin/manage/students").then((response) =>{
            setListStudent(response.data)
        });
    }, [])
    return (
        <div>
            <Link to = "/admin/manage/students/add" className="btn btn-primary">Thêm sinh viên</Link>
            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>Mã số sinh viên</th>
                    <th>Họ và tên</th>
                    <th>Lớp khóa học</th>
                </thead>
                
                {listStudent.map((value, key) => {
                    return (
                        <tbody>
                        <td>{key+1}</td>
                        <td>{value.student_id}</td>
                        <td>{value.name}</td>
                        <td>{value.faculty}</td>
                        </tbody>
                    );
                })}
               
                <tfoot>
                    
                </tfoot>
                </table>
            
        </div>
    )
}

export default Student
