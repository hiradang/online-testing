const express = require('express');
const router = express.Router();
const {Student_Course} = require('../models')
const {Courses} = require('../models')
const {Student} = require('../models')

router.get("/details/:courseId", async (req, res) => {
  let courseId = req.params.courseId;
  const courseInfo = await Student_Course.findAll({
    where: {course_id : courseId},
    include: [
      Courses  
    ]
  });
  res.json(courseInfo)
})
router.get("/update/:id", async (req, res) => {
  let studentId = req.params.id;
  console.log(studentId)
  const studentInfo = await Student_Course.findAll({
    where: {student_id : studentId},
  });
  res.json(studentInfo);
})

router.get("/:studentId", async (req, res) => {
  let studentId = req.params.studentId;
  console.log(studentId)
  const studentInfo = await Student_Course.findAll({
    where: {student_id : studentId},
    include: [
      Courses  
    ]
  });
  res.json(studentInfo);
})

router.get("/", async (req, res) => {
    const listStudent_Course = await Student_Course.findAll();
    res.json(listStudent_Course);
})

router.post("/", async (req, res) => {
     const temp = req.body;
    for (let i = 0; i < temp.student_id.length; i++) {
      const checkStudent = await Student.findByPk(temp.student_id[i]);
      await Student_Course.create({
        student_id: checkStudent.student_id,
        name: checkStudent.name,
        faculty: checkStudent.faculty,
        course_id: temp.course_id
      });
      
    }
    res.json(temp);
  });

module.exports = router;