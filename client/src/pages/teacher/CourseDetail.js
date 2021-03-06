import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import NoInformation from '../../components/NoInformation'

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
            axios.delete(`http://localhost:3001/admin/manage/grades/${examid}`);
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

    if (listExams.length > 0) {
        return (
            <div className="page-container"> 
                <div className="mb-16">
                    <Link to={`/teacher/${teacherId}`}
                    className="link">
                        <i class="fas fa-arrow-left"></i>
                        <span> </span>
                        Quay l???i
                    </Link>   
                    <span className="margin-left-10">
                        <i class="fas fa-caret-right"></i>
                        <span>{courseId}</span>       
                    </span>
                </div>
                <div>
                    <Link to={`/teacher/${teacherId}/${courseId}/view-student`}
                        className="link">
                        <button className="commonButton mb-16">
                            Xem danh s??ch sinh vi??n
                        </button>
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
                                <button onClick={() => handleDeleteExam(exam.examId)}
                                className="primaryButton">X??a b??i thi</button>
                                <button onClick={() => {
                                    history.push(`/teacher/${teacherId}/${courseId}/edit-exam/${exam.examId}`)
                                }} className="primaryButton">S???a ca thi</button>
                            </div>)
                        } else {
                            detailButton = (<button onClick={() => {
                                history.push(`/teacher/${teacherId}/${courseId}/view-exam/${exam.examId}`)
                            }} className="primaryButton">Xem l???i ca thi</button>)
                        }
                        return (
                            <div className="exam-info">
                                <ul> 
                                B??i ki???m tra s??? {++key}
                                    <li>T??n b??i ki???m tra: {exam.examName}</li>
                                    <li>Th???i gian m???: {moment(examStartTime).format('DD-MM-YYYY hh:mm A')}</li>
                                    <li>Th???i gian l??m b??i: {exam.duration} ph??t</li>
                                    <li>S??? c??u h???i: {exam.numberQuestion}</li>
                                </ul>
    
                                {detailButton}
                            </div>
                        )
                    })}
                </div>
    
                <button className="toCreateNewExamBtn commonButton" >
                    <Link to={`/teacher/${teacherId}/${courseId}/new-exam${numberExam}`}
                        className="link">
                        T???o m???t b??i thi m???i
                    </Link>   
                </button>
            </div>
        )
    } else {
        return (
            <div className="page-container">
                <div className="mb-16">
                    <Link to={`/teacher/${teacherId}`}
                    className="link">
                        <i class="fas fa-arrow-left"></i>
                        <span> </span>
                        Quay l???i
                    </Link> 
                    <span className="margin-left-10">
                        <i class="fas fa-caret-right"></i>
                        <span>{courseId}</span>       
                    </span>
                </div>

                <div>
                    <Link to={`/teacher/${teacherId}/${courseId}/view-student`}
                        className="link">
                        <button className="commonButton mb-16">
                            Xem danh s??ch sinh vi??n
                        </button>
                    </Link> 
                </div>

                Ch??a c?? ca thi n??o trong kh??a h???c n??y. <br/> <br/>
                <button className="toCreateNewExamBtn commonButton" >
                    <Link to={`/teacher/${teacherId}/${courseId}/new-exam${numberExam}`}
                        className="link">
                        T???o m???t b??i thi m???i
                    </Link>   
                </button>
            </div>
        )
    }
}

export default CourseDetail;