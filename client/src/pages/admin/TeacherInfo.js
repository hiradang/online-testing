import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function TeacherInfo() {
    let {id} = useParams();
    const [teacherInfo, setTeacherInfo] = useState([]);
    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/courses/${id}`).then((response) =>{
            setTeacherInfo(response.data)
        });
    }, [])
    return (
        <div>      
            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>Mã số giáo viên</th>
                    <th>Họ và tên</th>
                    <th>Email</th>
                    <th>Mã lớp học phần giảng dạy</th>
                    <th>Tên môn học giảng dạy</th>
                </thead>
                
                {teacherInfo.map((value, key) => {
                return (
                    <tbody>
                    <td>{key+1}</td>
                    <td>{value.Teacher.teacher_id}</td>
                    <td>{value.Teacher.teacher_name}</td>
                    <td>{value.Teacher.email}</td>
                    <td>{value.course_id}</td>
                    <td>{value.course_name}</td>
                    </tbody>
                )
                })}
                <tfoot>
                    
                </tfoot>
                </table>    
        </div>
    )
}

export default TeacherInfo
