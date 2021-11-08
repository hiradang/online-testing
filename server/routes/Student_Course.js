const express = require('express');
const router = express.Router();
const {Student_Course} = require('../models')
const {Courses} = require('../models')


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
    const newStudent_course = req.body;
    await Student_Course.create(newStudent_course);
    res.json(newStudent_course);
  });

module.exports = router;