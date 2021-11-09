import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

function TeacherInfo() {
    let {id} = useParams();
    let history = useHistory();
    const [teacherInfo, setTeacherInfo] = useState([]);
    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/courses/${id}`).then((response) =>{
            setTeacherInfo(response.data)
        });
    }, [])
    function del(e) {
        swal.fire({
            title: "Xóa giảng viên?",
            icon: "question",
            confirmButtonText: 'Xóa',
            showCancelButton: true,
            cancelButtonText: "Hủy",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`http://localhost:3001/admin/manage/teachers/delete/${id}`).then((response) => {
                    history.push("/admin/manage/teachers");
                });
            }
        })  
    }
    return (
        <div>      
            <a href = {`/admin/manage/teachers/update/${id}`} className="btnStudent btn btn-primary">Sửa thông tin giảng viên</a>
            <button className="delAddStudentCourse btnStudent btn btn-primary" onClick = {(e) => del(e)} >Xóa giảng viên</button>
            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>Mã số giảng viên</th>
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
