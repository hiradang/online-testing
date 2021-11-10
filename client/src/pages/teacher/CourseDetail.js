import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';

function CourseDetail() {
    let {courseId} = useParams();
    let {teacherId} = useParams();
    const [numberExam, setNumberExam] = useState([]);
    const [listExams, setListExams] = useState([]);
    const history = useHistory();
    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/exams/${courseId}`, ).then((res) => {
            setListExams(res.data);
            if (res.data.length > 0) {
                let lastExamId = res.data[res.data.length - 1].examId;
                setNumberExam(parseInt(lastExamId.split('--')[1]) + 1);
            } else {
                setNumberExam(0);
            }
        })
    }, [])

    function handleDeleteExam(examid) {
        if (window.confirm("Are you sure to delete this exam? You can't undo this action")) {
            axios.delete(`http://localhost:3001/admin/manage/exams/${examid}`);
            axios.delete(`http://localhost:3001/admin/manage/questions/${examid}`);
            axios.get(`http://localhost:3001/admin/manage/exams/${courseId}`, ).then((res) => {
                setListExams(res.data);
                if (res.data.length > 0) {
                    let lastExamId = res.data[res.data.length - 1].examId;
                    setNumberExam(parseInt(lastExamId.split('--')[1]) + 1);
                } else {
                    setNumberExam(0)
                }
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
                    const examStartTime = moment(exam.timeStart.substring(0, 16)).add(7, "hours").toDate();
                    // const examStartTime = moment(exam.timeStart.substring(0, 16)).utcOffset(7).toDate();
                    const examFinishTime = moment(examStartTime).add(exam.duration, "minutes").toDate();
                    const currentTime = new Date();
                    let detailButton;
                    if (key === 0) {
                    }

                    // Decide which button to appear depend on exam happened or not?
                    if (currentTime < examFinishTime) {
                        detailButton = (
                        <div>
                            <button onClick={() => handleDeleteExam(exam.examId)}>Xóa bài thi</button>
                            <button onClick={() => {
                                history.push(`/teacher/${teacherId}/${courseId}/edit-exam/${exam.examId}`)
                            }}>Sửa ca thi</button>
                        </div>)
                    } else {
                        detailButton = (<button onClick={() => {
                            history.push(`/teacher/${teacherId}/${courseId}/view-exam/${exam.examId}`)
                        }}>Xem lại ca thi</button>)
                    }
                    return (
                        <div className="exam-info">
                            <ul> 
                            Bài kiểm tra số {++key}
                                <li>Tên bài kiểm tra: {exam.examName}</li>
                                <li>Thời gian mở: {moment(examStartTime).format('DD-MM-YYYY hh:mm A')}</li>
                                <li>Thời gian làm bài: {exam.duration} phút</li>
                                <li>Số câu hỏi: {exam.numberQuestion}</li>
                            </ul>

                            {detailButton}
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