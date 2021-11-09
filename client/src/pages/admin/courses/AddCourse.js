import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.css'
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";


function AddCourse() {
    let history = useHistory();
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/admin/manage/courses", data).then((response) => {
            history.push("/admin/manage/courses");
        });
      };
    const [data, setData] = useState({
        course_id: "",
        course_name: "",
        teacher_id: "",    
    });
    function handle(e) {
        const newData = {...data};
        newData[e.target.name] = e.target.value;
        setData(newData);
    }
    const [listTeachers, setListTeachers] = useState([]);
    useEffect(()=> {
        axios.get("http://localhost:3001/admin/manage/teachers").then((response) =>{
            setListTeachers(response.data)
        });
    }, [])
    return (
        <div className = "formAddStudent">
            <form onSubmit = {(e)=>onSubmit(e)}>
            <div className = "formRow">
                        <label>Mã số lớp học phần:</label>
                        <input id = "" name="course_id" className = "inputAddStudent" required onChange = {(e)=> handle(e)}></input>
                    </div>
                    <div className = "formRow">
                        <label>Tên môn học:</label>
                        <input id = "" name="course_name" className = "inputAddStudent" required onChange = {(e)=> handle(e)}></input>
                    </div>
                    <div className = "formRow">
                        <label>Mã số giảng viên</label>
                        <input list = "teachers" id = "" name="teacher_id" className = "inputAddStudent" required onChange = {(e)=> handle(e)}></input>
                        <datalist id="teachers">
                            {listTeachers.map((value, key) => {
                                return (
                                <option value={value.teacher_id}></option>
                                )}
                            )}
                            </datalist>
                    </div>
                    
                    <button type="submit" className="btn btn-primary buttonAddStudent" >Thêm lớp học phần</button>
            </form>
        </div>
    )
}

export default AddCourse
