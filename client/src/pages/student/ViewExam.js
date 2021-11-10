import React from 'react'
import {Link} from 'react-router-dom';
import { useEffect, useState } from "react";
import {useParams} from 'react-router';
import axios from 'axios';

function ViewExam() {
    const {studentId} = useParams();
    const {examId} = useParams();
    const {courseId} = useParams();
    const [gradeInfo, setGradeInfo] = useState({});

    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/grades/${studentId}/${examId}`).then((res) => {
            setGradeInfo(res.data[0]);
        })
    }, [])
    
    return (
        <div className="page-container view-exam">
            <Link to={`/student/${studentId}/${courseId}`}>
            <i class="fas fa-arrow-left"></i>
                <span> </span>
                Quay lại
            </Link><br/> 
            <h2>Bạn đã hoàn thành bài thi</h2>
            <p>Điểm số của bạn cho bài thi này là: {gradeInfo.grade}</p>
            <p>Bạn không được phép thực hiện lại bài thi này.</p>
        </div>
    )
}

export default ViewExam