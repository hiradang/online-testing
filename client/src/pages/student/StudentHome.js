import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import NoInformation from '../../components/NoInformation'

function StudentHome() {
    let {studentId} = useParams();
    let history = useHistory();
    const [listCourses, setListCourses] = useState([]);
    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/student-course/${studentId}`).then((response) =>{
            setListCourses(response.data);
        });
    }, [])

    if (listCourses.length > 0) {
        return (
            <div>
                <div className="page-container teacher-home-container">
                    <h2 className="list-title">Danh sách các môn học</h2>
                    <ul className="courses-list">
                        {listCourses.map((course, key) => {
                            let courseId = course.course_id;
                            return (
                                <div>
                                    <li className="courses-item" onClick={() => {
                                        // push to CourseDetail
                                        history.push(`/student/${studentId}/${courseId}`)
                                    }}>
                                        {course.course_id} - {course.Course.course_name}
                                    </li>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    } else {
        return (
            <NoInformation />
        )
    }
}

export default StudentHome 