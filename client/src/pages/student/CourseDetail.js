import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';

function CourseDetail() {
    let {courseId} = useParams();
    let {studentId} = useParams();
    const [listExams, setListExams] = useState([]);
    const history = useHistory();
    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/exams/${courseId}`, ).then((res) => {
            setListExams(res.data);
        })

    }, [])

    function handleTakeExam(examId) {
        let gradeInfo = {
            examId: examId,
            studentId: studentId,
            realTimeStart : Date.now(),
            grade: 0
        }

        axios.get(`http://localhost:3001/admin/manage/grades/${studentId}/${examId}`).then((response) =>{
            if (response.data.length === 0) {
                axios.post("http://localhost:3001/admin/manage/grades", gradeInfo)
                    .then((res) => {
                        history.push(`/student/${studentId}/${courseId}/do-exam/${examId}`);
                    })
            }
        })


            history.push(`/student/${studentId}/${courseId}/do-exam/${examId}`);
    }

    return (
        <div className="page-container"> 
            <div>
                <Link to={`/student/${studentId}`}
                className="link">
                Quay lại
                </Link>          
            </div>

            <div>
                {listExams.map((exam, key) => {
                    const examStartTime = moment(exam.timeStart.substring(0, 16)).add(7, "hours").toDate();
                    const examFinishTime = moment(examStartTime).add(exam.duration, "minutes").toDate();
                    const currentTime = new Date();
                    let detailButton;

                    // Decide which button to appear depend on exam happened or not?
                    if (currentTime < examStartTime) {
                        detailButton = "Chưa đến giờ làm bài"
                    } else if (false) {
                        detailButton = "Quay lai bai thi"
                    } else if (currentTime < examFinishTime) {
                        detailButton = (<button onClick={() => handleTakeExam(exam.examId)}>Tham gia thi</button>)
                    } else {
                        detailButton = (<button onClick={() => {
                            history.push(`/student/${studentId}/${courseId}/view-exam/${exam.examId}`)
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
        </div>
    )
}

export default CourseDetail;