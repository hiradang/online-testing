import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

function Courses() {
    const [listCourses, setListCourses] = useState([]);
    let history = useHistory();
    useEffect(()=> {
        axios.get("http://localhost:3001/admin/manage/courses").then((response) =>{
            setListCourses(response.data)
        });
    }, [])
    return (
        <div>
            <Link to = "/admin/manage/students/add" className="btn btn-primary">Thêm lớp học phần</Link>
            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>Mã lớp học phần</th>
                    <th>Tên môn học</th>
                    <th>Giáo viên</th>
                </thead>
                
                {listCourses.map((value, key) => {
                    return (
                        <tbody className = "row_table" onClick={()=> {
                            history.push(`/admin/manage/courses/${value.course_id}`)
                        }} >
                        <td>{key+1}</td>
                        <td>{value.course_id}</td>
                        <td>{value.course_name}</td>
                        <td>{value.teacher_name}</td>
                        </tbody>
                    );
                })}
               
                <tfoot>
                    
                </tfoot>
                </table>
            
        </div>
    )
}

export default Courses
