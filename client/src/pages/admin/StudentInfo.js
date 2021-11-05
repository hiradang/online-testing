import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function StudentInfo() {
    let {id} = useParams();
    const [studentInfo, setStudentInfo] = useState([]);
    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/students/${id}`).then((response) =>{
            console.log(response.data)
            setStudentInfo(response.data)
        });
    }, [])
    return (
        <div>      
            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>Mã số sinh viên</th>
                    <th>Họ và tên</th>
                    <th>Lớp khóa học</th>
                    <th>Mã lớp học phần</th>
                    <th>Tên môn học</th>
                </thead>
                
                {studentInfo.map((value, key) => {
                return (
                    <tbody>
                    <td>{key+1}</td>
                    <td>{value.student_id}</td>
                    <td>{value.name}</td>
                    <td>{value.faculty}</td>
                    <td>{value.course_id}</td>
                    <td>{value.Course.course_name}</td>
                    </tbody>
                )
                })}
                <tfoot>
                    
                </tfoot>
                </table>    
        </div>
    )
}

export default StudentInfo