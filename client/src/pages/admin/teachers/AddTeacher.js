import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';
import '@fortawesome/fontawesome-free/css/all.css'

function AddTeacher() {
    let history = useHistory();
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/admin/manage/teachers", data).then((response) => {
            if (response.data.error) {
                Swal.fire({
                    title: "Oops...",
                    text: response.data.error,
                    icon: "question",
                    button: "Done",
            
                })
            }
            else history.push("/admin/manage/teachers");
        });
      };
    const [data, setData] = useState({
        teacher_id: "",
        teacher_name: "",
        email: "",
    });
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
                <input id = "" name="teacher_id" className = "inputAddStudent" required onChange = {(e)=> handle(e)}></input>
            </div>
            <div className = "formRow">
                <label>Họ và tên:</label>
                <input id = "" name="teacher_name" className = "inputAddStudent" required onChange = {(e)=> handle(e)}></input>
            </div>
            <div className = "formRow">
                <label>Email:</label>
                <input id = "" name="email" className = "inputAddStudent" required onChange = {(e)=> handle(e)}></input>
            </div>
            <button type="submit" className="btn btn-primary buttonAddStudent">Thêm giảng viên</button>
            </form>
        </div>
    )
}

export default AddTeacher
