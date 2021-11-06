import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

function CourseDetail() {
    let {courseId} = useParams();
    let {teacherId} = useParams();
    const [listExams, setListExams] = useState([]);
    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/exams/${courseId}`, ).then((res) => {
            setListExams(res.data);
        })

    }, [])

    return (
        <div className="page-container"> 
            <Link to={`/teacher/${teacherId}`}>Quay lại</Link>          
            <Link to={`/teacher/${teacherId}/${courseId}/view-student`}>Xem danh sách sinh viên</Link> 

            <div>
                {listExams.map((exam, key) => {
                    return (
                        <ul className="exam-info"> Bài kiểm tra số {++key}
                            <li>Tên bài kiểm tra: {exam.examName}</li>
                            <li>Thời gian mở: {exam.timeStart}</li>
                            <li>Thời gian làm bài: {exam.duration}</li>
                            <li>Số câu hỏi: {exam.numberQuestion}</li>
                        </ul>
                    )
                })}
            </div>
            <Link to={`/teacher/${teacherId}/${courseId}/new-exam`}>Tạo một bài thi mới</Link>   
        </div>
    )
}

export default CourseDetail;