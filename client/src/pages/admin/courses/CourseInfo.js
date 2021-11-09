import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert2';

function CourseInfo() {
    let {id} = useParams();
    let history = useHistory();
    const [courseInfo, setCourseInfo] = useState([]);
    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/student-course/details/${id}`).then((response) =>{
            setCourseInfo(response.data)
        });
    }, [])
    function del(e) {
        swal.fire({
            title: "Xóa lớp học phần?",
            icon: "question",
            confirmButtonText: 'Xóa',
            showCancelButton: true,
            cancelButtonText: "Hủy",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`http://localhost:3001/admin/manage/courses/delete/${id}`).then((response) => {
                    history.push("/admin/manage/courses");
                });
            }
        })  
    }
    return (
        <div>    
            <a href = {`/admin/manage/courses/update/${id}`} className="btnStudent btn btn-primary">Sửa thông tin lớp học phần</a>
            <button className="delAddStudentCourse btnStudent btn btn-primary" onClick = {(e) => del(e)} >Xóa lớp học phần</button>  
            <a href = {`/admin/manage/courses/update/${id}/addStudent`} className="btnStudent btn btn-primary">Thêm học sinh</a>
            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>Mã số sinh viên</th>
                    <th>Họ và tên</th>
                    <th>Lớp khóa học</th>
                    <th>Mã lớp học phần</th>
                    <th>Tên môn học</th>
                </thead>
                
                {courseInfo.map((value, key) => {
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

export default CourseInfo
