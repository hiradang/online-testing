import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
import swal from 'sweetalert2';
import {Link} from "react-router-dom";

function Courses() {
    const [data, setData] = useState({
        course_id: "",
        course_name: "",
        teacher_name: "",
    });
    const [sort, setSort] = useState({
        by: "",
        value: 0
    })
    const [listCourse, setListCourse] = useState([]);
    var [tempListCourse, setTempListCourse] = useState([])
    function onSort(e) {
        const newSort = {...sort};
        if (sort.by === e.target.id) {
            newSort.value = (sort.value === 1 ? -1 : 1)
        } else {
            newSort.by = e.target.id;
            newSort.value = 1;
        }
        setTempListCourse(tempListCourse.sort((courseOne, courseTwo) => {
            if (newSort.by === 'idSort') {
                if (courseOne.course_id.toLowerCase() > courseTwo.course_id.toLowerCase()) return +newSort.value
                else return -newSort.value;
            } else if (newSort.by === 'nameSort') {
                if (courseOne.course_name.toLowerCase() > courseTwo.course_name.toLowerCase()) return +newSort.value
                else return -newSort.value;
            } else {
                if (courseOne.teacher_name.toLowerCase() > courseTwo.teacher_name.toLowerCase()) return +newSort.value
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
            var temp = listCourse.filter((course) => {
                return (course.course_name.toLowerCase().indexOf(data.course_name) !==-1   && course.course_id.toLowerCase().indexOf(data.course_id) !==-1 &&
                        course.teacher_name.toLowerCase().indexOf(data.teacher_name) !== -1)
            })
            setTempListCourse(temp)    
        }
    }
    let history = useHistory();
    useEffect(()=> {
        axios.get("http://localhost:3001/admin/manage/courses").then((response) =>{
            setListCourse(response.data);
            setTempListCourse(response.data);
        });
    }, [])
    function del(e) {
        swal.fire({
            title: "Xóa lớp học phần?",
            icon: "question",
            confirmButtonText: 'Xóa',
            showCancelButton: true,
            cancelButtonText: "Hủy",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                var course = e.target.parentNode.parentNode;
                axios.get(`http://localhost:3001/admin/manage/courses/delete/${course.id}`).then((response) => {
                    setTempListCourse(response.data)
                    history.push("/admin/manage/courses");
                });
            }
        })  
    }
    return (
        <div>
            <Link to = "/admin/manage/courses/add" className="btnStudent btn btn-primary">Thêm lớp học phần</Link>
            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>
                        <label className = "infoStudent" id = "idSort" onClick = {(e)=> onSort(e)}>Mã lớp học phần</label>
                        <br/>
                        <input className="searchStudent" name = "course_id"onChange = {(e)=> handle(e)} 
                                onKeyDown = {(e) => search(e)}>
                        </input>
                    </th>
                    <th>
                        <label className = "infoStudent" id = "nameSort" onClick = {(e)=> onSort(e)}>Tên môn học</label>
                        <br/>
                        <input className="searchStudent" name = "course_name"onChange = {(e)=> handle(e)} 
                                onKeyDown = {(e) => search(e)}>
                        </input>
                    </th>
                    <th>
                        <label className = "infoStudent" id = "teacherSort" onClick = {(e)=> onSort(e)}>Giảng viên</label>
                        <br/>
                        <input className="searchStudent" name = "teacher_name"onChange = {(e)=> handle(e)} 
                                onKeyDown = {(e) => search(e)}>
                        </input>
                    </th>
                    <th></th>
                    <th></th>
                </thead>
                
                {tempListCourse.map((value, key) => {
                    return (
                        <tbody className = "row_table"  id = {value.course_id}  >
                        <td onClick={()=> {
                            history.push(`/admin/manage/courses/${value.course_id}`)
                        }}>{key+1}</td>
                        <td onClick={()=> {
                            history.push(`/admin/manage/courses/${value.course_id}`)
                        }}>{value.course_id}</td>
                        <td onClick={()=> {
                            history.push(`/admin/manage/courses/${value.course_id}`)
                        }}>{value.course_name}</td>
                        <td onClick={()=> {
                            history.push(`/admin/manage/courses/${value.course_id}`)
                        }}>{value.teacher_name}</td>
                        <td> <a href = {`/admin/manage/courses/update/${value.course_id}`} className="fas fa-edit"> </a></td>
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

export default Courses
