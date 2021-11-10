import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom'

function ViewStudentGrade() {
    const {examId} = useParams();
    const {teacherId} = useParams();
    const {courseId} = useParams();
    const [listGrade, setListGrade] = useState([])
    const [listStudents, setlistStudents] = useState([]);
    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/grades/examId/${examId}`).then((res) => {
            setListGrade(res.data);
        })

        axios.get(`http://localhost:3001/admin/manage/student-course/details/${courseId}`).then((response) =>{
            setlistStudents(response.data);
        });
    }, [])


    return (
        <div className="page-container list-student-container">
            <Link to={`/teacher/${teacherId}/${courseId}/view-exam/${examId}`}>Quay lại</Link><br/>
            <table>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">MSSV</th>
                    <th className="text-center">Tên sinh viên</th>
                    <th className="text-center">Lớp khóa học</th>
                    <th className="text-center">Điểm</th>
                </tr>

                {listStudents.map((student, key) => {
                    const currentGrade = listGrade.filter((value) => {
                        return (value.studentId === student.student_id)
                    })

                    let grade;

                    if (currentGrade.length === 0) grade = "-"; 
                    else {
                        grade = currentGrade[0].grade;
                    } 

                    return (
                        <tr>
                            <td className="text-center">{key+1}</td>
                            <td className="text-center">{student.student_id}</td>
                            <td>{student.name}</td>
                            <td className="text-center">{student.faculty}</td>
                            <td className="text-center">{grade}</td>
                        </tr>
                    )
                })} 
            </table>
        </div>
    )
}

export default ViewStudentGrade