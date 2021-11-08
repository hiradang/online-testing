import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.css'


function UpdateStudent() {
    let history = useHistory();
    let {id} = useParams();
    const [studentInfo, setStudentInfo] = useState([]);
    const [listCourses, setListCourses] = useState([]);
    const [data, setData] = useState({
        student_id: "",
        name: "",
        faculty: "",
        course_id: []
    });

    useEffect(()=> {      
       axios.get(`http://localhost:3001/admin/manage/student-course/update/${id}`).then((response) =>{
            setStudentInfo(response.data);
            console.log("get data")
            data.name = response.data[0].name
            data.student_id = response.data[0].student_id;
            data.faculty = response.data[0].faculty;
            for (let i = 0; i< response.data.length; i++) {
                data.course_id[i] = response.data[i].course_id
            }
        });
        axios.get("http://localhost:3001/admin/manage/courses").then((response) =>{
            setListCourses(response.data)
        });
    }, [])
    
    
    const onSubmit = (e) => {
        var course_id = document.getElementsByName("course_id");
        const newData = {...data};
        for (let i = 0; i< course_id.length; i++) {
            newData.course_id[i] = course_id[i].value;
        }
        setData(newData);
        e.preventDefault();
        axios.post("http://localhost:3001/admin/manage/students/update", data).then((response) => {
            history.push("/admin/manage/students");
        });
      };
      console.log(studentInfo)
    var count = studentInfo.length;
    function handle(e) {
        const newData = {...data};
        newData[e.target.name] = e.target.value;
        setData(newData);
    }
    
    var course = document.getElementById('addCourse');
    function delAddStudentCourse(e) {
        course.removeChild(e.target.parentNode)    
        data.course_id[e.target.parentNode.id] = null   
    }
    return (
        <div className = "formAddStudent">
            <form onSubmit = {(e)=>onSubmit(e)}>
            <div className = "formRow">
                        <label>Mã số sinh viên:</label>
                        <input name="student_id" className = "inputAddStudent" required 
                        value = {id} onChange = {(e)=> handle(e)} readOnly></input>
                    </div>
                    <div className = "formRow">
                        <label>Họ và tên:</label>
                        <input name="name" className = "inputAddStudent" required id = "student_name"
                        value = {data.name} onChange = {(e)=> handle(e)}></input>
                    </div>
                    <div className = "formRow">
                        <label>Lớp khóa học:</label>
                        <input name="faculty" className = "inputAddStudent" required id = "student_faculty"
                        value = {data.faculty} onChange = {(e)=> handle(e)}></input>
                    </div>
                    <div className = "formRow" id = "addCourse">
                        <label>Các lớp học phần:</label>
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
                        {data.course_id.map((value, key) => {
                            const newData = {...data};
                            return(
                            <div id = {key}>     
                                <input list="courses" name="course_id"  required
                                value = {newData.course_id[key]} className = "inputAddStudentCourse course_id" 
                                onChange = {(e) => {
                                    newData.course_id[key] = e.target.value
                                    setData(newData);
                                    }}/>
                                <datalist id="courses">
                                {listCourses.map((value, key) => {
                                    return (
                                    <option value={value.course_id}></option>
                                    )}
                                )}
                                </datalist>
                                <i className="delAddStudentCourse fas fa-trash" name = {key} onClick = {(e)=> delAddStudentCourse(e)} ></i>
                            </div> )
                        })}    
                    </div>
                    <button type="submit" className="btn btn-primary buttonAddStudent" >Sửa thông tin sinh viên</button>
            </form>
        </div>
    )
}

export default UpdateStudent
