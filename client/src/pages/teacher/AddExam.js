import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage} from "formik";
import { useParams } from 'react-router';
import axios from 'axios';
import * as Yup from 'yup';
import {useHistory, Link} from 'react-router-dom';
import moment from 'moment';

function AddExam() {
    const {courseId} = useParams();
    const {teacherId} = useParams();
    const {numberExam} = useParams();
    const examId = courseId + "--"+ numberExam;
    const history = useHistory();
    const initialValues = {
        examName: "",
        timeStart: "",
        duration: "",
        numberQuestion: "",
        questionContent: [],
        choice1: [],
        choice2: [],
        choice3: [],
    };
    
    const validationSchema = Yup.object().shape({
        examName: Yup.string().required("Bạn phải nhập tên bài thi!"),
        timeStart: Yup.date().required("Bạn phải chọn thời gian bắt đầu!").min(moment(Date.now()).format('YYYY-MM-DDTHH:mm'), "Ngày thi không hợp lệ"),
        duration: Yup.number().required("Bạn phải nhập thời gian làm bài!").min(1, "Thời gian thi tối thiểu là 1 phút"),
        numberQuestion: Yup.number().required("Bạn phải nhập số lượng câu hỏi!").min(1, "Số lượng câu hỏi tối thiểu là 1"),
    });
    
    const onSubmit = async (data) => {
        let newExam =  {
            examId: examId,
            examName: data.examName,
            course_id: courseId,
            timeStart: data.timeStart,
            duration: data.duration,
            numberQuestion: data.numberQuestion,
            private: false
        }

        // Add questions
        for (let i = 0; i < numberQuestion; i++) {
            let newQuestion = {
                examId: examId,
                questionContent: data.questionContent[i],
                result: data.result[i],
                choice1: data.choice1[i],
                choice2: data.choice2[i],
                choice3: data.choice3[i],
            }
            await axios.post("http://localhost:3001/admin/manage/questions", newQuestion).then((response) => {
            });
        }

        await axios.post("http://localhost:3001/admin/manage/exams", newExam).then((response) => {
            history.goBack(`teacher/${teacherId}/:${courseId}`);
        });
    };



    // Hanlde add question Fields based on question numbers
    const [numberQuestion, setNumberQuestion] = useState();
    const handleOnBlur = function(e) {
        setNumberQuestion(e.target.value);
    }
    let questionFields = [];
    const addQuestionField =  function() {
        for (let i = 0; i < numberQuestion; i++) {
            let newQuestion = (
                <div className="questionContainer">
                    <label>Câu hỏi số: {i + 1}</label>
                    <ErrorMessage className="errorMessage" name={`questionContent[${i}]`} component="div" />
                    <Field
                        class="inputCreateExam questionContent"
                        name={`questionContent[${i}]`}
                        required
                    />

                    <label>Đáp án</label>
                    <Field
                        class="result"
                        name={`result[${i}]`}
                        required
                    />

                    <label>Lựa chọn 1</label>
                    <Field
                        class="choice1"
                        name={`choice1[${i}]`}
                        required
                    />

                    <label>Lựa chọn 2</label>
                    <Field
                        class="choice2"
                        name={`choice2[${i}]`}
                        required
                    />

                    <label>Lựa chọn 3</label>
                    <Field
                        class="choice3"
                        name={`choice3[${i}]`}
                        required
                    />
                </div>
            )
            questionFields.push(newQuestion);
        }
    }

    return (
        <div className="page-container"> 
            <Link to={`/teacher/${teacherId}/${courseId}`}
            className="link">
                <i class="fas fa-arrow-left"></i>
                <span> </span>
                Quay lại
            </Link>  
            <h2 className="list-title">Tạo một ca thi mới</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="formContainer">
                    <label>Tên kỳ thi: </label>
                    <ErrorMessage className="errorMessage" name="examName" component="div" />
                    <Field
                        autocomplete="off"
                        class="inputCreateExam"
                        name="examName"
                        placeholder="Kiểm tra cuối kỳ"
                    />
                    
                    <label>Thời gian làm bài: (phút) </label>
                    <ErrorMessage className="errorMessage" name="duration" component="div" />
                    <Field
                        type="number"
                        autocomplete="off"
                        class="inputCreateExam"
                        name="duration"
                        placeholder=""
                    />

                    <label>Thời gian tổ chức thi (MM/DD/YY) </label>
                    <ErrorMessage className="errorMessage" name="timeStart" component="div" />
                    <Field
                        type="datetime-local"
                        autocomplete="off"
                        class="inputCreateExam"
                        name="timeStart"
                    />

                    <label>Số lượng câu hỏi: </label>
                    <ErrorMessage className="errorMessage" name="numberQuestion" component="div" />
                    <Field
                        onBlur={(e) => {
                            handleOnBlur(e);
                        }}
                        type="number"
                        autocomplete="off"
                        class="inputCreateExam numberQuestion"
                        name="numberQuestion"
                    />
            

                    <button 
                        type="button"
                        onclick={addQuestionField()}
                        className="addQuestionbtn primary commonButton">
                        Thêm câu hỏi
                    </button>

                    {questionFields}
                    <button className="button submitButton commonButton" type="submit">
                        Tạo ca thi
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default AddExam;