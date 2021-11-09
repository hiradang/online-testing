import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.css'


function UpdateTeacher() {
    let history = useHistory();
    let {id} = useParams();
    const [teacherInfo, setTeacherInfo] = useState([]);
    const [data, setData] = useState({
        teacher_id: "",
        teacher_name: "",
        email: "",
    });
    useEffect(()=> {      
       axios.get(`http://localhost:3001/admin/manage/teachers/${id}`).then((response) =>{
            setTeacherInfo(response.data);
            setData(response.data)
        });
    }, [])
    
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/admin/manage/teachers/update", data).then((response) => {
            history.push("/admin/manage/teachers");
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
                        <label>Mã số giảng viên:</label>
                        <input name="teacher_id" className = "inputAddStudent" required 
                        value = {id} onChange = {(e)=> handle(e)} readOnly></input>
                    </div>
                    <div className = "formRow">
                        <label>Họ và tên:</label>
                        <input name="teacher_name" className = "inputAddStudent" required id = "teacher_name"
                        value = {data.teacher_name} onChange = {(e)=> handle(e)}></input>
                    </div>
                    <div className = "formRow">
                        <label>Email:</label>
                        <input name="email" className = "inputAddStudent" required id = "email"
                        value = {data.email} onChange = {(e)=> handle(e)}></input>
                    </div>
                    <button type="submit" className="btn btn-primary buttonAddStudent">Sửa thông tin giáo viên</button>
            </form>
        </div>
    )
}

export default UpdateTeacher
