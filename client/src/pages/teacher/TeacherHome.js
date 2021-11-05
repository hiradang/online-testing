import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function TeacherHome() {
    let {teacherId} = useParams();
    const [listCourses, setListCourses] = useState([]);
    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/courses/${teacherId}`).then((response) =>{
            setListCourses(response.data)
            console.log(response.data);
        });
    }, [])

    return (
        <div>
            <Router>
                <Switch>
                    {/* <Route path={`/teacher/${teacherId}/:courseId`} exact component={}></Route> */}
                </Switch>
            </Router>
            <div className="container">
                <h2 className="coures-list-title">Danh sách các môn học</h2>
                <ul className="courses-list">
                    {listCourses.map((course, key) => {
                        return (
                            <div>
                            <Link to={`/teacher/${teacherId}/:courseId`}>Xem chi tiết</Link>
                            <li className="courses-item">
                                {course.course_id} - {course.course_name}
                            </li>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default TeacherHome