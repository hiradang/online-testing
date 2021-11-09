import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";


function Teacher() {
    let history = useHistory();
    const [listTeachers, setListTeachers] = useState([]);
    var [tempListTeachers, setTempListTeachers] = useState([])
    useEffect(()=> {
        axios.get("http://localhost:3001/admin/manage/teachers").then((response) =>{
            setListTeachers(response.data)
            setTempListTeachers(response.data);
        });
    }, [])
    const [data, setData] = useState({
        teacher_id: "",
        teacher_name: "",
        email: "",
    });

    const [sort, setSort] = useState({
        by: "",
        value: 0
    })
    
    function onSort(e) {
        const newSort = {...sort};
        if (sort.by === e.target.id) {
            newSort.value = (sort.value === 1 ? -1 : 1)
        } else {
            newSort.by = e.target.id;
            newSort.value = 1;
        }
        setTempListTeachers(tempListTeachers.sort((teacherOne, teacherTwo) => {
            if (newSort.by === 'idSort') {
                if (teacherOne.teacher_id.toString() > teacherTwo.teacher_id.toString()) return +newSort.value
                else return -newSort.value;
            } else if (newSort.by === 'nameSort') {
                if (teacherOne.teacher_name.toLowerCase() > teacherTwo.teacher_name.toLowerCase()) return +newSort.value
                else return -newSort.value;
            } else {
                if (teacherOne.email.toLowerCase() > teacherTwo.email.toLowerCase()) return +newSort.value
                else return -newSort.value;
            }
        }))
        setSort(newSort);
    }
    function handle(e) {
        const newData = {...data};
        newData[e.target.name] = e.target.value.toLowerCase();
        setData(newData);
    }
    function search(e) {
        if (e.keyCode === 13 || e.key === 'Enter') {
            var temp = listTeachers.filter((teacher) => {
                return (teacher.teacher_name.toLowerCase().indexOf(data.teacher_name) !==-1   && teacher.teacher_id.toString().indexOf(data.teacher_id) !==-1 &&
                    teacher.email.toLowerCase().indexOf(data.email) !== -1)
            })
            console.log(data)
            setTempListTeachers(temp)    
        }
    }
    
    function del(e) {
        swal.fire({
            title: "Xóa giáo viên?",
            icon: "question",
            confirmButtonText: 'Xóa',
            showCancelButton: true,
            cancelButtonText: "Hủy",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                var teacher = e.target.parentNode.parentNode;
                axios.get(`http://localhost:3001/admin/manage/teachers/delete/${teacher.id}`).then((response) => {
                    setTempListTeachers(response.data)
                    history.push("/admin/manage/teachers");
                });
            }
        })  
    }
    return (
        <div>
            <Link to = "/admin/manage/teachers/add" className="btnStudent btn btn-primary">Thêm giáo viên</Link>
            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th><label className = "infoTeacher" id = "idSort" onClick = {(e)=> onSort(e)}>Mã số giáo viên</label>
                        <br/>
                        <input className="searchTeacher" name = "teacher_id" onChange = {(e)=> handle(e)} 
                            onKeyDown = {(e) => search(e)}>
                        </input>
                    </th>
                    <th><label className = "infoTeacher" id = "nameSort"  onClick = {(e)=> onSort(e)}>Họ và tên</label>
                    <br/>
                        <input className="searchTeacher" name = "teacher_name"  onChange = {(e)=> handle(e)}
                            onKeyDown = {(e) => search(e)}>
                        </input>
                    </th>
                    <th><label className = "infoStudent" id = "emailSort"  onClick = {(e)=> onSort(e)}>Email</label>
                    <br/>
                        <input className="searchTeacher" name = "email" onChange = {(e)=> handle(e)}
                                onKeyDown = {(e) => search(e)}>
                        </input>
                    </th>
                    <th></th>
                    <th></th>
                </thead>
                
                {tempListTeachers.map((value, key) => {
                    return (
                        <tbody className = "row_table" id = {value.teacher_id}  >
                        <td onClick={()=> {
                            history.push(`/admin/manage/teachers/${value.teacher_id}`)
                        }}>{key+1}</td>
                        <td onClick={()=> {
                            history.push(`/admin/manage/teachers/${value.teacher_id}`)
                        }}>{value.teacher_id}</td>
                        <td onClick={()=> {
                            history.push(`/admin/manage/teachers/${value.teacher_id}`)
                        }}>{value.teacher_name}</td>
                        <td onClick={()=> {
                            history.push(`/admin/manage/teachers/${value.teacher_id}`)
                        }}>{value.email}</td>
                        <td> <a href = {`/admin/manage/teachers/update/${value.teacher_id}`} className="fas fa-edit"> </a></td>
                        <td><i className="delAddOfAdmin fas fa-trash" onClick = {(e) => del(e)} ></i></td>
                        </tbody>
                    );
                })}
               
                <tfoot>
                    
                </tfoot>
                </table>
            
        </div>
    )
}

export default Teacher
