import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import {Link} from 'react-router-dom';

function ListStudent() {
    let {courseId} = useParams();    
    let {teacherId} = useParams();
    const [listStudents, setlistStudents] = useState([]);
    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/student-course/details/${courseId}`).then((response) =>{
            setlistStudents(response.data);
        });
    }, [])

    let courseInfo;
    if (listStudents[0] !== undefined) {
        courseInfo = (
            <div>
                <h4>Môn học: {listStudents[0].Course.course_name}</h4>
                <h4>Lớp môn học: {listStudents[0].Course.course_id}</h4>
                <h4>Giảng viên: {listStudents[0].Course.teacher_name}</h4>
            </div>
        )
    }

    return (
        <div>
            <div className="page-container list-student-container">
                <Link to={`/teacher/${teacherId}/${courseId}`}>Quay lại</Link>
                <h2 className="list-title">Danh sách các sinh viên </h2>
                {courseInfo}
                <table>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">MSSV</th>
                        <th className="text-center">Tên sinh viên</th>
                        <th className="text-center">Lớp khóa học</th>
                    </tr>

                    {listStudents.map((student, key) => {
                        return (
                            <tr>
                                <td className="text-center">{key+1}</td>
                                <td className="text-center">{student.student_id}</td>
                                <td>{student.name}</td>
                                <td className="text-center">{student.faculty}</td>
                            </tr>
                        )
                    })} 
                </table>




            </div>
        </div>
    )
}

export default ListStudent;