import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from 'react-router';
import axios from 'axios';
import * as Yup from 'yup';
import {useHistory} from 'react-router-dom';

function AddExam() {
    const {courseId} = useParams();
    const {teacherId} = useParams();
    const history = useHistory();
    const initialValues = {
        examName: "",
        timeStart: "",
        duration: "",
        numberQuestion: ""
    };
    
    const validationSchema = Yup.object().shape({
    });
    
    const onSubmit = (data) => {
        let newExam =  {
            examName: data.examName,
            course_id: courseId,
            timeStart: data.timeStart,
            duration: data.duration,
            numberQuestion: data.numberQuestion,
            private: false
        }

        axios.post("http://localhost:3001/admin/manage/exams", newExam).then((response) => {
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
                    <ErrorMessage name="questionContent" component="div" />
                    <Field
                        class="inputCreateExam questionContent"
                        name={`questionContent${i + 1}`}
                    />

                    <label>Đáp án</label>
                    <Field
                        class="result"
                        name={`result${i + 1}`}
                    />

                    <label>Lựa chọn 1</label>
                    <Field
                        class="choice1"
                        name={`choice1${i + 1}`}
                    />

                    <label>Lựa chọn 2</label>
                    <Field
                        class="choice2"
                        name={`choice2${i + 1}`}
                    />

                    <label>Lựa chọn 3</label>
                    <Field
                        class="choice3"
                        name={`choice3${i + 1}`}
                    />
                </div>
            )
            questionFields.push(newQuestion);
        }
    }

    return (
        <div className="page-container"> 
            <h2 className="list-title">Tạo một ca thi mới</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="formContainer">
                    <label>Tên kỳ thi: </label>
                    <ErrorMessage name="examName" component="div" />
                    <Field
                        autocomplete="off"
                        class="inputCreateExam"
                        name="examName"
                        placeholder="Kiểm tra cuối kỳ"
                    />
                    
                    <label>Thời gian làm bài: (phút) </label>
                    <ErrorMessage name="duration" component="div" />
                    <Field
                        type="number"
                        autocomplete="off"
                        class="inputCreateExam"
                        name="duration"
                        placeholder=""
                    />

                    <label>Thời gian tổ chức thi: </label>
                    <ErrorMessage name="timeStart" component="div" />
                    <Field
                        type="date"
                        autocomplete="off"
                        class="inputCreateExam"
                        name="timeStart"
                    />

                    <label>Số lượng câu hỏi: </label>
                    <ErrorMessage name="numberQuestion" component="div" />
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
                        className="addQuestionbtn">
                        Thêm câu hỏi
                    </button>

                    {questionFields}
                    <button className="button submitButton" type="submit">
                        Tạo ca thi
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default AddExam;