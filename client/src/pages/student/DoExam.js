import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router';
import Question from './Question';
import Countdown from 'react-countdown';
import {useHistory} from 'react-router-dom';

function DoExam() {
    const {examId} = useParams();
    const {studentId} = useParams();
    const {courseId} = useParams();
    const [listQuestions, setListQuestions] = useState([]);
    const checkQuestionCorrect = [];
    const [timeLeft, setTimeLeft] = useState("");
    const history = useHistory();
    
    useEffect(()=>{
        axios.get(`http://localhost:3001/admin/manage/questions/${examId}`).then((response) =>{
            setListQuestions(response.data);
        })

        const fetchData = async() => {
            const res1 = await axios.get(`http://localhost:3001/admin/manage/exams/examId/${examId}`)

            const res2 = await axios.get(`http://localhost:3001/admin/manage/grades/${studentId}/${examId}`)

            let duration = res1.data.duration * 60 * 1000;
            let timeFinish = parseInt(res2.data[0].realTimeStart) + duration;
            let timeLeftTem = timeFinish - Date.now();
            setTimeLeft(timeLeftTem)
        }
        fetchData();

    }, [])

    window.onbeforeunload = function() { return "Your work will be lost."; };

    // Initiate check array
    const numberQuestion = listQuestions.length;
    for (var i = 0; i < numberQuestion ; i++) {
        checkQuestionCorrect.push(0);
    }
    
    const checkQuestion = function(key, res) {
        if (res === "true" && checkQuestionCorrect[key] === 0) {
            checkQuestionCorrect[key] = 1;
        } else if (res === "false" && checkQuestionCorrect[key] === 1) {
            checkQuestionCorrect[key] = 0;
        }
    }
    
    function countFinalPoint() {
        let count = 0;
        for (var i = 0; i < numberQuestion; i++) {
            if (checkQuestionCorrect[i]) count++;
        }
        let finalPoint = (Math.round((count/numberQuestion) * 100)/10);
        return finalPoint;
    }

    const handleSubmit = function(e) {
        let finalPoint = countFinalPoint();
        let gradeInfo = {
            grade: finalPoint,
            isFinish: true
        }
        axios.post(`http://localhost:3001/admin/manage/grades/${studentId}/${examId}`, gradeInfo)
        .then((res) => {
            window.alert("Bạn đã hoàn thành bài thi!")
            history.push(`/student/${studentId}/${courseId}`);
        })
    }

    return (
        <div className="page-container do-exam">
            <div className="left">
                {listQuestions.map((question, key) => {
                    return (
                        <div id={key}> 
                            <Question
                                question={question} 
                                questionKey={key} 
                                checkQuestion={checkQuestion}
                            />
                        </div>
                    )
                })}

                <button onClick={handleSubmit}>Nộp bài</button>
            </div>

            <div className="right">
                <div className="time">
                    Thời gian:
                    <Countdown date={Date.now() + timeLeft} 
                    onComplete={handleSubmit}
                    daysInHours="false"
                    />
                </div>
                
                <div>
                    {listQuestions.map((question, key) => {
                        // return (
                        //     <a href={`#${key}`}>{key + 1}</a>
                        // )
                    })}
                </div>
            </div>
        </div>
    )
}

export default DoExam