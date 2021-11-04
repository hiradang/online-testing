import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";


function Teacher() {
    const [listTeachers, setListTeachers] = useState([]);
    useEffect(()=> {
        axios.get("http://localhost:3001/admin/manage/teachers").then((response) =>{
            setListTeachers(response.data)
        });
    }, [])
    return (
        <div>
            <Link to = "/admin/manage/students/add" className="btn btn-primary">Thêm giáo viên</Link>
            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>Mã số giáo viên</th>
                    <th>Họ và tên</th>
                    <th>Email</th>
                </thead>
                
                {listTeachers.map((value, key) => {
                    return (
                        <tbody>
                        <td>{key+1}</td>
                        <td>{value.teacher_id}</td>
                        <td>{value.teacher_name}</td>
                        <td>{value.email}</td>
                        </tbody>
                    );
                })}
               
                <tfoot>
                    
                </tfoot>
                </table>
            
        </div>
    )
}

export default Teacher
