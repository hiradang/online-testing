import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import '../../css/teacher.css';

function ListStudent() {
    let {courseId} = useParams();
    const [listCourses, setListCourses] = useState([]);
    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/students-courses/${courseId}`).then((response) =>{
            setListCourses(response.data)
            console.log(response.data);
        });
    }, [])

    return (
        <div>
            <div className="">

            </div>
        </div>
    )
}

export default ListStudent;