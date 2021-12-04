import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom'
import { Pie, Line } from 'react-chartjs-2';
import {Chart} from 'chart.js/auto';

function ViewStudentGrade() {
    const {examId} = useParams();
    const {teacherId} = useParams();
    const {courseId} = useParams();
    const [listGrade, setListGrade] = useState([])
    const [listStudents, setlistStudents] = useState([]);
    useEffect(()=> {
        axios.get(`http://localhost:3001/admin/manage/grades/examId/${examId}`).then((res) => {
            setListGrade(res.data);
        })

        axios.get(`http://localhost:3001/admin/manage/student-course/details/${courseId}`).then((response) =>{
            setlistStudents(response.data);
        });
    }, [])

    //Thống kê điểm số của sinh viên
    let gradeList = listGrade.map((student) => {
        return (student.grade);
    })

    let gradeInfoData =[];
    for (let i = 0; i < gradeList.length; i++) {
        gradeInfoData[gradeList[i]] = (gradeInfoData[gradeList[i]] || 0) + 1;
    }

    let sorted = Object.keys(gradeInfoData).sort((a, b) => gradeInfoData[b] - gradeInfoData[a]);
    let topData = [];
    for (let i = 0; i < sorted.length; i++) {
        topData.push(gradeInfoData[sorted[i]]);
    }
    // Số lượng sinh viên bỏ thi
    topData.push(listStudents.length - listGrade.length);
    gradeInfoData["Bỏ thi"] = listStudents.length - listGrade.length;

    const dataClass = {
        labels: [...sorted, "Bỏ thi"],
        datasets: [
            {
            label: '# of Votes',
            data: topData,
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

    // Phổ điểm bài thi của tất cả sinh viên
    const labels = sorted.sort((a, b) => +a - +b);
    // Thêm phần từ "Bỏ thi"
    labels.unshift("Bỏ thi")
    let lineData = {
        labels,
        datasets: [
          {
            label: 'Số lượng sinh viên',
            data: sorted.map((ele) => gradeInfoData[ele]),
            borderColor: 'rgb(64, 151, 237)',
            backgroundColor: 'rgba(64, 151, 237, 0.5)',
          },
        ],
      };

    // Phổ điểm bài thi của các sinh viên tham gia
    const labels2 = labels.slice(1, labels.length + 1);
    labels2.map((ele, index) => console.log("Phan tu " + ele + ": " + gradeInfoData[ele]))
    let lineData2 = {
        labels: labels2,
        datasets: [
        {
            label: 'Số lượng sinh viên',
            data: labels2.map((ele) => gradeInfoData[ele]),
            borderColor: 'rgb(34, 227, 201)',
            backgroundColor: 'rgba(34, 227, 201, 0.5)',
        },
        ],
    };


    return (
        <div className="page-container list-student-container">
            <Link to={`/teacher/${teacherId}/${courseId}/view-exam/${examId}`}>
                <i class="fas fa-arrow-left"></i>
                <span> </span>
                Quay lại
            </Link><br/>

            <div className="grade-students">
                <div className="left">
                    <table>
                        <tr>
                            <th className="text-center">STT</th>
                            <th className="text-center">MSSV</th>
                            <th className="text-center">Tên sinh viên</th>
                            <th className="text-center">Lớp khóa học</th>
                            <th className="text-center">Điểm</th>
                        </tr>

                        {listStudents.map((student, key) => {
                            const currentGrade = listGrade.filter((value) => {
                                return (value.studentId === student.student_id)
                            })

                            let grade;

                            if (currentGrade.length === 0) grade = "-"; 
                            else {
                                grade = currentGrade[0].grade;
                            } 

                            return (
                                <tr>
                                    <td className="text-center">{key+1}</td>
                                    <td className="text-center">{student.student_id}</td>
                                    <td>{student.name}</td>
                                    <td className="text-center">{student.faculty}</td>
                                    <td className="text-center">{grade}</td>
                                </tr>
                            )
                        })} 
                    </table>
                </div>

                <div className="right">
                    <div>
                        <Pie
                            data ={dataClass}
                        />
                        <p className="chart-title"><b>Hình 1.</b> Tỉ lệ điểm số của sinh viên</p>
                    </div>

                    <div>
                        <Line
                            data ={lineData}
                        />
                        <p className="chart-title"><b>Hình 2.</b> Phổ điểm của tất cả sinh viên</p>
                    </div>

                    <div>
                        <Line
                            data ={lineData2}
                        />
                        <p className="chart-title"><b>Hình 3.</b> Phổ điểm của các sinh viên tham gia thi</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewStudentGrade