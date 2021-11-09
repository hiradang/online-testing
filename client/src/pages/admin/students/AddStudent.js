import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.css'
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";


function AddStudent() {
    let history = useHistory();
    var count = 0;
    const onSubmit = (e) => {
        var course_id = document.getElementsByName("course_id");
        const newData = {...data};
        for (let i = 0; i< course_id.length; i++) {
            newData.course_id[i] = course_id[i].value;
        }
        setData(newData);
        e.preventDefault();
        axios.post("http://localhost:3001/admin/manage/students", data).then((response) => {
            history.push("/admin/manage/students");
        });
      };
    const [data, setData] = useState({
        student_id: "",
        name: "",
        faculty: "",
        course_id: []
    });
    function handle(e) {
        const newData = {...data};
        newData[e.target.name] = e.target.value;
        setData(newData);
    }
    const [listCourses, setListCourses] = useState([]);
    useEffect(()=> {
        axios.get("http://localhost:3001/admin/manage/courses").then((response) =>{
            setListCourses(response.data)
        });
    }, [])
    var course = document.getElementById('addCourse');
    function delAddStudentCourse(e) {
        course.removeChild(e.target.parentNode)       
    }
    return (
        <div className = "formAddStudent">
            <form onSubmit = {(e)=>onSubmit(e)}>
            <div className = "formRow">
                        <label>Mã số sinh viên:</label>
                        <input id = "" name="student_id" className = "inputAddStudent" required onChange = {(e)=> handle(e)}></input>
                    </div>
                    <div className = "formRow">
                        <label>Họ và tên:</label>
                        <input id = "" name="name" className = "inputAddStudent" required onChange = {(e)=> handle(e)}></input>
                    </div>
                    <div className = "formRow">
                        <label>Lớp khóa học:</label>
                        <input id = "" name="faculty" className = "inputAddStudent" required onChange = {(e)=> handle(e)}></input>
                    </div>
                    <div className = "formRow" id = "addCourse">
                        <label>Thêm lớp học phần:</label>
                        <i className="addStudentCourse fas fa-plus-square" onClick = {()=> {
                           var div = document.createElement('div');
                            var Field = document.createElement("input");
                            Field.setAttribute('list', 'courses');
                            Field.name = "course_id";
                            count += 1;
                            Field.id = count.toString();
                            Field.classList.add("inputAddStudentCourse");
                            Field.classList.add("course_id");
                            Field.setAttribute("required", "required")
                            var dl = document.createElement('datalist');
                            dl.id = "courses";
                            listCourses.map((value, key) => {                               
                                var option = document.createElement('option');
                                option.value = value.course_id;
                                dl.appendChild(option)
                            })
                            var icon = document.createElement('i');
                            icon.classList.add("delAddStudentCourse")
                            icon.classList.add("fas")
                            icon.classList.add("fa-trash");
                            icon.name = count.toString();
                            icon.onclick = (e) => delAddStudentCourse(e);
                            div.appendChild(Field);
                            div.appendChild(icon);
                            course.appendChild(div)
                        }}></i>       
                        <div>     
                            <input list="courses" name="course_id" id = {count} required className = "inputAddStudentCourse course_id" />
                            <datalist id="courses">
                            {listCourses.map((value, key) => {
                                return (
                                <option value={value.course_id}></option>
                                )}
                            )}
                            </datalist>
                            <i className="delAddStudentCourse fas fa-trash" name = {count} onClick = {(e)=> delAddStudentCourse(e)} ></i>
                        </div> 
                    </div>
                    <button type="submit" className="btn btn-primary buttonAddStudent" >Thêm sinh viên</button>
            </form>
        </div>
    )
}

export default AddStudent
