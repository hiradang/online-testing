import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form, Field, ErrorMessage} from 'formik'

import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";


function AddStudent() {
    return (
        <div className = "formAddStudent">
            <Formik >
                <Form>
                    <div className = "formRow">
                        <label>Mã số sinh viên:</label>
                        <Field id = "" name="id_student" className = "inputAddStudent"></Field>
                    </div>
                    <div className = "formRow">
                        <label>Họ và tên:</label>
                        <Field id = "" name="name" className = "inputAddStudent"></Field>
                    </div>
                    <div className = "formRow">
                        <label>Lớp khóa học:</label>
                        <Field id = "" name="faculty" className = "inputAddStudent" ></Field>
                    </div>
                    {/* <div className = "formRow">
                        <label>Ngày sinh sinh viên:</label>
                        <Field id = "" name="birthday" type = "date" className = "inputAddStudent"></Field>
                    </div> */}
                    <button type="submit" className="btn btn-primary buttonAddStudent">Thêm sinh viên</button>
                </Form>
            </Formik>
        </div>
    )
}

export default AddStudent
