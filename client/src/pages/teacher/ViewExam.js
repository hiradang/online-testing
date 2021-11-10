import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom'

function ViewExam() {
    const {examId} = useParams();
    const {teacherId} = useParams();
    const {courseId} = useParams();
    const [listQuestions, setListQuestions] = useState([]);
    const isAllowEdit = true;
    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/questions/${examId}`).then((response) =>{
            setListQuestions(response.data);
        });
    }, [])


    return (
        <div className="page-container">
            <Link to={`/teacher/${teacherId}/${courseId}`}>
                <i class="fas fa-arrow-left"></i>
                <span> </span>
                Quay lại</Link><br/>
            <Link to={`/teacher/${teacherId}/${courseId}/view-grade/${examId}`}>Xem điểm của sinh viên</Link>
            {listQuestions.map((question, key) => {
                return (
                    <div>
                        <h3>Câu hỏi {key + 1}</h3>
                        <fieldset disabled={isAllowEdit} className="showQuestion">
                            <input type="text" value={`Câu hỏi: ${question.questionContent}`} />
                            <input type="text" value={`Đáp án: ${question.result}`} />
                            <input type="text" value={`Lựa chọn 1: ${question.choice1}`} />
                            <input type="text" value={`Lựa chọn 2: ${question.choice2}`} />
                            <input type="text" value={`Lựa chọn 3: ${question.choice3}`} />
                        </fieldset>
                    </div>
                )
            })}
        </div>
    )
}

export default ViewExam