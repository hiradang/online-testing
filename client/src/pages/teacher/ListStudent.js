import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import {Link} from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import {Chart} from 'chart.js/auto';

function ListStudent() {
    let {courseId} = useParams();    
    let {teacherId} = useParams();
    const [listStudents, setlistStudents] = useState([]);
    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/student-course/details/${courseId}`).then((response) =>{
            setlistStudents(response.data);
        });
    }, [])

    let courseInfo;
    if (listStudents[0] !== undefined) {
        courseInfo = (
            <div>
                <h4>Môn học: {listStudents[0].Course.course_name}</h4>
                <h4>Lớp môn học: {listStudents[0].Course.course_id}</h4>
                <h4>Giảng viên: {listStudents[0].Course.teacher_name}</h4>
            </div>
        )
    }


    // Thống kê số lượng các lớp khóa học
    let facultyList = listStudents.map((student) => {
        return (student.faculty);
    })
    let classInfoData =[];
    for (let i = 0; i < facultyList.length; i++) {
        classInfoData[facultyList[i]] = (classInfoData[facultyList[i]] || 0) + 1;
    }

    let sorted = Object.keys(classInfoData).sort((a, b) => classInfoData[b] - classInfoData[a]);
    let top5 = sorted.slice(0, 4);
    let top5Data = [];
    let count = 0;
    for (let i = 0; i < 4; i++) {
        top5Data.push(classInfoData[top5[i]]);
        count += classInfoData[top5[i]];
    }
    top5Data.push(facultyList.length - count);

    const dataClass = {
        labels: [...top5, "Còn lại"],
        datasets: [
            {
            label: '# of Votes',
            data: top5Data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(140, 0, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1
            }
        ]
    }


    // Thống kê hình thức học của sinh viên (học lại, học lần đầu,...)
    let typeList = listStudents.map((student) => {
        return (student.type);
    })
    let typeInfoData =[];
    for (let i = 0; i < typeList.length; i++) {
        typeInfoData[typeList[i]] = (typeInfoData[typeList[i]] || 0) + 1;
    }

    let sorted1 = Object.keys(typeInfoData).sort((a, b) => typeInfoData[b] - typeInfoData[a]);
    let topType = sorted1.slice(0, 4);
    let topTypeData = [];
    for (let i = 0; i < 4; i++) {
        topTypeData.push(typeInfoData[topType[i]]);
    }

    const dataStudyType = {
        labels: [...topType],
        datasets: [
            {
            label: '# of Votes',
            data: topTypeData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(140, 0, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1
            }
        ],
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Custom Chart Title'
                }
            }
        }
    }

    return (
        <div>
            <div className="page-container list-student-container">
                <Link to={`/teacher/${teacherId}/${courseId}`}>Quay lại</Link>
                <h2 className="list-title">Danh sách các sinh viên </h2>
                {courseInfo}

                <div className="grade-students">
                    <table>
                        <tr>
                            <th className="text-center">STT</th>
                            <th className="text-center">MSSV</th>
                            <th className="text-center">Tên sinh viên</th>
                            <th className="text-center">Lớp khóa học</th>
                        </tr>

                        {listStudents.map((student, key) => {
                            return (
                                <tr>
                                    <td className="text-center">{key+1}</td>
                                    <td className="text-center">{student.student_id}</td>
                                    <td>{student.name}</td>
                                    <td className="text-center">{student.faculty}</td>
                                </tr>
                            )
                        })} 
                    </table>

                    <div className="right">
                        <div>
                            <Pie
                                data ={dataClass}
                            />
                            <p className="chart-title"><b>Hình 1.</b> Lớp khóa học của sinh viên</p>
                        </div>

                        <div>
                            <Pie
                                data ={dataStudyType}
                            />
                            <p className="chart-title"><b>Hình 2.</b> Hình thức tham gia học của sinh viên</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListStudent;