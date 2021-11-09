import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.css'


function UpdateCourse() {
    
    let history = useHistory();
    let {id} = useParams();
    const [courseInfo, setCourseInfo] = useState([]);
    const [listTeachers, setListTeachers] = useState([]);
    const [data, setData] = useState({
        course_id: "",
        course_name: "",
        teacher_id: "",
    });

    useEffect(()=> {      
       axios.get(`http://localhost:3001/admin/manage/courses/update/${id}`).then((response) =>{
            setCourseInfo(response.data);
            data.course_id = response.data.course_id;
            data.course_name = response.data.course_name;
            data.teacher_id = response.data.teacher_id;
        });
        axios.get("http://localhost:3001/admin/manage/teachers").then((response) =>{
            setListTeachers(response.data)
        });
    }, [])
    
    
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/admin/manage/courses/update", data).then((response) => {
            history.push("/admin/manage/courses");
        });
      };
    function handle(e) {
        const newData = {...data};
        newData[e.target.name] = e.target.value;
        setData(newData);
    }
    
    return (
        <div className = "formAddStudent">
            <form onSubmit = {(e)=>onSubmit(e)}>
            <div className = "formRow">
                        <label>Mã lớp học phần:</label>
                        <input name="course_id" className = "inputAddStudent" required 
                        value = {id} onChange = {(e)=> handle(e)} readOnly></input>
                    </div>
                    <div className = "formRow">
                        <label>Tên môn học:</label>
                        <input name="course_name" className = "inputAddStudent" required id = "course_name"
                        value = {data.course_name} onChange = {(e)=> handle(e)}></input>
                    </div>
                    <div className = "formRow">
                        <label>Mã số giảng viên:</label>
                        <input name="teacher_id" list = "teachers" className = "inputAddStudent" required id = "teacher_id"
                        value = {data.teacher_id} onChange = {(e)=> handle(e)}></input>
                        <datalist id="teachers">
                            {listTeachers.map((value, key) => {
                                return (
                                <option value={value.teacher_id}></option>
                                )}
                            )}
                            </datalist>
                    </div>
                   
                    <button type="submit" className="btn btn-primary buttonAddStudent" >Sửa thông tin lớp học phần</button>
            </form>
        </div>
    )
}

export default UpdateCourse
