import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
import swal from 'sweetalert2';
import {Link} from "react-router-dom";
import { TablePagination } from '@trendmicro/react-paginations';
import '@trendmicro/react-paginations/dist/react-paginations.css';

function Students() {
    const [data, setData] = useState({
        studentId: "",
        name: "",
        faculty: "",
    });
    const [sort, setSort] = useState({
        by: "",
        value: 0
    })
    const [pageLength,setPageLength] = useState(50)
    const [page, setPage] = useState(1)
    const [listStudent, setListStudent] = useState([]);
    var [tempListStudent, setTempListStudent] = useState([])
    function onSort(e) {
        const newSort = {...sort};
        if (sort.by === e.target.id) {
            newSort.value = (sort.value === 1 ? -1 : 1)
        } else {
            newSort.by = e.target.id;
            newSort.value = 1;
        }
        setTempListStudent(tempListStudent.sort((studentOne, studentTwo) => {
            if (newSort.by === 'idSort') {
                if (studentOne.student_id.toString() > studentTwo.student_id.toString()) return +newSort.value
                else return -newSort.value;
            } else if (newSort.by === 'nameSort') {
                if (studentOne.name.toLowerCase() > studentTwo.name.toLowerCase()) return +newSort.value
                else return -newSort.value;
            } else {
                if (studentOne.faculty.toLowerCase() > studentTwo.faculty.toLowerCase()) return +newSort.value
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
            var temp = listStudent.filter((student) => {
                return (student.name.toLowerCase().indexOf(data.name) !==-1   && student.student_id.toString().indexOf(data.studentId) !==-1 &&
                        student.faculty.toLowerCase().indexOf(data.faculty) !== -1)
            })
            setTempListStudent(temp)    
            setPage(1) 
        }
    }
    let history = useHistory();
    useEffect(()=> {
        axios.get("http://localhost:3001/admin/manage/students").then((response) =>{        
            setListStudent(response.data);
            setTempListStudent(response.data);
        });
    }, [])
    function del(e) {
        swal.fire({
            title: "Xóa sinh viên?",
            icon: "question",
            confirmButtonText: 'Xóa',
            showCancelButton: true,
            cancelButtonText: "Hủy",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                var student = e.target.parentNode.parentNode;
                axios.get(`http://localhost:3001/admin/manage/students/delete/${student.id}`).then((response) => {
                    setTempListStudent(response.data)
                    history.push("/admin/manage/students");
                });
            }
        })  
    }
    return (
        <div>
            <Link to = "/admin/manage/students/add" className="btnStudent btn btn-primary">Thêm sinh viên</Link>
            <br/>
            <div style={{float: 'right'}}>
            <TablePagination
                type="full"
                page={page}
                pageLength={pageLength}
                totalRecords={tempListStudent.length}
                pageLengthMenu = {[10,50,100,500,1000]}
                onPageChange={({ page, pageLength }) => {
                    setPage(page);
                    setPageLength(pageLength)
                }}
                prevPageRenderer={() => <i className="fa fa-angle-left" />}
                nextPageRenderer={() => <i className="fa fa-angle-right" />}
            />
            </div>
            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th><label className = "infoStudent" id = "idSort" onClick = {(e)=> onSort(e)}>Mã số sinh viên</label>
                        <br/>
                        <input className="searchStudent" name = "studentId"onChange = {(e)=> handle(e)} 
                                onKeyDown = {(e) => search(e)}>
                        </input>
                    </th>
                    <th><label className = "infoStudent" id = "nameSort"  onClick = {(e)=> onSort(e)}>Họ và tên</label>
                    <br/>
                        <input className="searchStudent" name = "name"  onChange = {(e)=> handle(e)}
                                onKeyDown = {(e) => search(e)}>
                        </input>
                    </th>
                    <th><label className = "infoStudent" id = "facultySort"  onClick = {(e)=> onSort(e)}>Lớp khóa học</label>
                    <br/>
                        <input className="searchStudent" name = "faculty" onChange = {(e)=> handle(e)}
                                onKeyDown = {(e) => search(e)}>
                        </input>
                    </th>
                    <th></th>
                    <th></th>
                </thead>
                
                {tempListStudent.slice((page-1)*pageLength,page*pageLength).map((value, key) => {
                    return (
                        <tbody className = "row_table" id = {value.student_id}  >
                            <td onClick={()=> {
                                history.push(`/admin/manage/students/${value.student_id}`)
                            }} >{key+1}</td>
                            <td onClick={()=> {
                                history.push(`/admin/manage/students/${value.student_id}`)
                            }} >{value.student_id}</td>
                            <td onClick={()=> {
                                history.push(`/admin/manage/students/${value.student_id}`)
                            }} >{value.name}</td>
                            <td onClick={()=> {
                                history.push(`/admin/manage/students/${value.student_id}`)
                            }} >{value.faculty}</td>
                            <td> <a href = {`/admin/manage/students/update/${value.student_id}`} className="fas fa-edit"> </a></td>
                            <td><i className="delAddOfAdmin fas fa-trash" onClick = {(e) => del(e)} ></i></td>
                        </tbody>
                    );
                })}
               
                <tfoot>
                    
                </tfoot>
                </table>
            <div style={{float: 'right'}}>
            <TablePagination
                type="full"
                page={page}
                pageLength={pageLength}
                totalRecords={tempListStudent.length}
                pageLengthMenu = {[10,50,100,500,1000]}
                onPageChange={({ page, pageLength }) => {
                    setPage(page);
                    setPageLength(pageLength)
                }}
                prevPageRenderer={() => <i className="fa fa-angle-left" />}
                nextPageRenderer={() => <i className="fa fa-angle-right" />}
            />
            </div>
            <div style = {{clear: 'right'}}></div>
        </div>
    )
}

export default Students
