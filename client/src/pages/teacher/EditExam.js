import { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from "react-router";
import {ErrorMessage, Formik, Form, Field} from 'formik';
import moment from 'moment';
import EditQuestion from "./EditQuestion";
import {Link} from 'react-router-dom';

function AddExam() {
    const {examId} = useParams();
    const {teacherId} = useParams();
    const {courseId} = useParams();
    const [examName, setExamName] = useState("")
    const [duration, setDuration] = useState("")
    const [timeStart, setTimeStart] = useState("")
    const [numberQuestion, setNumberQuestion] = useState("")
    const [questionList, setQuestionList] = useState([])
    const history = useHistory();

    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/exams/examId/${examId}`, ).then((res) => {
            setExamName(res.data.examName);
            setDuration(res.data.duration);
            setNumberQuestion(res.data.numberQuestion);

            // Edit the time
            let timeStartGMT7 = moment(res.data.timeStart.substring(0, 16)).add(7, "hours").toDate();
            setTimeStart(moment(timeStartGMT7).format("YYYY-MM-DDThh:mm"));
        })

        axios.get(`http://localhost:3001/admin/manage/questions/${examId}`).then((res) => {
            setQuestionList(res.data);
        })
    }, [])

    const handleEditCourse = (data) => {
        let editedExam = {
            examId: examId,
            examName: examName,
            duration: duration,
            timeStart: timeStart,
            numberQuestion: numberQuestion
        }
        axios.post(`http://localhost:3001/admin/manage/exams/${examId}`, editedExam).then((res) => {
            window.alert("Sửa ca thi thành công!");
            history.goBack(`/teacher/${teacherId}/${courseId}`);
        })
    }

    return (
        <div className="page-container"> 
            <Link to={`/teacher/${teacherId}/${courseId}`}>Quay lại</Link>
            <Formik onSubmit={handleEditCourse}
                initialValues={{}}
            >
                <Form className="formContainer">
                    <label>Tên kỳ thi: </label>
                    <ErrorMessage className="errorMessage" name="examName" component="div" />
                    <Field
                        autocomplete="off"
                        class="inputCreateExam"
                        name="examName"
                        placeholder="Kiểm tra cuối kỳ"
                        value={examName}
                        onChange={(e) => setExamName(e.target.value)}
                    />
                    
                    <label>Thời gian làm bài: (phút) </label>
                    <ErrorMessage className="errorMessage" name="duration" component="div" />
                    <Field
                        type="number"
                        autocomplete="off"
                        class="inputCreateExam"
                        name="duration"
                        placeholder=""
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />

                    <label>Thời gian tổ chức thi (MM/DD/YYYY) </label>
                    <ErrorMessage className="errorMessage" name="timeStart" component="div" />
                    <Field
                        type="datetime-local"
                        autocomplete="off"
                        class="inputCreateExam"
                        name="timeStart"
                        value={timeStart.substring(0, 16)}
                        onChange={(e) => setTimeStart(e.target.value)}
                    />

                    <label>Số lượng câu hỏi: </label>
                    <ErrorMessage className="errorMessage" name="numberQuestion" component="div" />
                    <Field
                        type="number"
                        autocomplete="off"
                        class="inputCreateExam numberQuestion"
                        name="numberQuestion"
                        value={numberQuestion}
                        onChange={(e) => setNumberQuestion(e.target.value)}
                        disabled="true"
                    />
                    <button className="button submitButton" type="submit">
                        Sửa ca thi
                    </button>

                </Form>
            </Formik>
            {questionList.map((question, key) => {
                return (
                    <EditQuestion question={question} keyQuestion={key} />
                )
            })}
        </div>
    )
}

export default AddExam;