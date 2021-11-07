import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';

function CourseDetail() {
    let {courseId} = useParams();
    let {teacherId} = useParams();
    const [numberExam, setNumberExam] = useState([]);
    const [listExams, setListExams] = useState([]);
    const history = useHistory();
    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/exams/${courseId}`, ).then((res) => {
            setListExams(res.data);
            let lastExamId = res.data[res.data.length - 1].examId;
            setNumberExam(parseInt(lastExamId.split('--')[1]) + 1);
        })
    }, [])

    function handleDeleteExam(examid) {
        if (window.confirm("Are you sure to delete this exam? You can't undo this action")) {
            axios.delete(`http://localhost:3001/admin/manage/exams/${examid}`)
            axios.get(`http://localhost:3001/admin/manage/exams/${courseId}`, ).then((res) => {
                setListExams(res.data);
                let lastExamId = res.data[res.data.length - 1].examId;
                setNumberExam(parseInt(lastExamId.split('--')[1]) + 1);
            })
            window.location.reload();
        }
    }

    return (
        <div className="page-container"> 
            <div>
                <Link to={`/teacher/${teacherId}`}
                className="link">
                Quay lại
                </Link>          
            </div>
            <div>
                <Link to={`/teacher/${teacherId}/${courseId}/view-student`}
                    className="link">
                Xem danh sách sinh viên
                </Link> 
            </div>

            <div>
                {listExams.map((exam, key) => {
                    return (
                        <div className="exam-info">
                            <ul
                                onClick={() => {
                                    // push to CourseDetail
                                    history.push(`/teacher/${teacherId}/${courseId}/view-exam/${exam.examId}`)
                                }}
                            > 
                            Bài kiểm tra số {++key}
                                <li>Tên bài kiểm tra: {exam.examName}</li>
                                <li>Thời gian mở: {exam.timeStart}</li>
                                <li>Thời gian làm bài: {exam.duration}</li>
                                <li>Số câu hỏi: {exam.numberQuestion}</li>
                            </ul>
                            <button onClick={() => handleDeleteExam(exam.examId)}>Xóa bài thi</button>
                            <button onClick={() => {
                                history.push(`/teacher/${teacherId}/${courseId}/edit-exam/${exam.examId}`)
                            }}>Sửa ca thi</button>
                        </div>
                    )
                })}
            </div>

            <button className="toCreateNewExamBtn">
                <Link to={`/teacher/${teacherId}/${courseId}/new-exam${numberExam}`}
                    className="link">
                    Tạo một bài thi mới
                </Link>   
            </button>
        </div>
    )
}

export default CourseDetail;