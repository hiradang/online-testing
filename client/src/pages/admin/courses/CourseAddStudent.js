import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css'

function CourseAddStudent() {
    let {id} = useParams();
    let history = useHistory();
    const [listStudents, setListStudents] = useState([]);
    const [data, setData] = useState(
        {
            course_id: id,
            student_id: []
        }
    );
    var count = 0;
    useEffect(()=> {
        axios.get("http://localhost:3001/admin/manage/students").then((response) =>{
            setListStudents(response.data)
        });
    }, [])
    var student = document.getElementById('addStudent');
    function delAddStudentCourse(e) {
        student.removeChild(e.target.parentNode)       
    }
    const submit = (e) => {
        var student_id = document.getElementsByName("student_id")
        const newData = {...data};
        for (let i = 0; i< student_id.length; i++) {
            newData.student_id[i] = student_id[i].value;
        }
        console.log(data)
        setData(newData);
        e.preventDefault();
        axios.post("http://localhost:3001/admin/manage/student-course", data).then((response) => {
            history.push(`/admin/manage/courses/${id}`)
        });
      };
    return (
        <div id = "couresAddStudent">
            <button type="submit" className="btn btn-primary buttonAddStudent" onClick = {(e)=> submit(e)}>Thêm sinh viên</button>
            <div className = "formRow" id = "addStudent">
                        <label>Mã số sinh viên:</label>
                        <i className="addStudentCourse fas fa-plus-square" onClick = {()=> {
                           var div = document.createElement('div');
                            var Field = document.createElement("input");
                            Field.setAttribute('list', 'students');
                            Field.name = "student_id";
                            count += 1;
                            Field.id = count.toString();
                            Field.classList.add("inputAddStudentCourse");
                            Field.classList.add("student_id");
                            Field.setAttribute("required", "required")
                            var dl = document.createElement('datalist');
                            dl.id = "students";
                            listStudents.map((value, key) => {                               
                                var option = document.createElement('option');
                                option.value = value.student_id;
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
                            student.appendChild(div)
                        }}></i>       
                        <div>     
                            <input list="students" name="student_id" id = {count} required className = "inputAddStudentCourse student_id" />
                            <datalist id="students">
                            {listStudents.map((value, key) => {
                                return (
                                <option value={value.student_id}></option>
                                )}
                            )}
                            </datalist>
                            <i className="delAddStudentCourse fas fa-trash" name = {count} onClick = {(e)=> delAddStudentCourse(e)} ></i>
                        </div> 
                    </div>
                    
        </div>
    )
}

export default CourseAddStudent
