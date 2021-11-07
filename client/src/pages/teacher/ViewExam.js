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
            <Link to={`/teacher/${teacherId}/${courseId}`}>Quay lại</Link>
            <Link to="/">Xem điểm của sinh viên</Link>
            {listQuestions.map((question, key) => {
                return (
                    <div>
                        <h3>Câu hỏi {key + 1}</h3>
                        <fieldset disabled={isAllowEdit} className="showQuestion">
                            <input type="text" value={question.id} />
                            <input type="text" value={question.questionContent} />
                            <input type="text" value={question.result} />
                            <input type="text" value={question.choice1} />
                            <input type="text" value={question.choice2} />
                            <input type="text" value={question.choice3} />
                        </fieldset>
                        <button>Sua</button>
                    </div>
                )
            })}
        </div>
    )
}

export default ViewExam