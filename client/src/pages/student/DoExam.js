import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom'

function DoExam() {
    const {examId} = useParams();
    const {studentId} = useParams();
    const {courseId} = useParams();
    const [listQuestions, setListQuestions] = useState([]);
    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/questions/${examId}`).then((response) =>{
            setListQuestions(response.data);
        });
    }, [])


    return (
        <div className="page-container do-exam">
            <div className="left">
                <Link to={`/student/${studentId}/${courseId}`}>Quay lại</Link>
                {listQuestions.map((question, key) => {
                    return (
                        <div>
                            <h3>Câu hỏi {key + 1}</h3>
                            <fieldset className="showQuestion">
                                <input type="text" value={question.id} />
                                <input type="text" value={question.questionContent} />
                                <input type="text" value={question.result} />
                                <input type="text" value={question.choice1} />
                                <input type="text" value={question.choice2} />
                                <input type="text" value={question.choice3} />
                            </fieldset>
                        </div>
                    )
                })}
            </div>

            <div className="right">Dong ho ow day</div>
        </div>
    )
}

export default DoExam