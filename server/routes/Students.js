const express = require('express');
const router = express.Router();
const {Student} = require('../models')
const {Student_Course} = require('../models')
const {Courses} = require('../models')

router.get("/", async (req, res) => {
    const listStudent = await Student.findAll();
    res.json(listStudent)
})

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id
  await Student.destroy({
    where: {
      student_id: id
    }
  })
  Student_Course.destroy({
    where: {
      student_id: id
    }
  })
  const listStudent = await Student.findAll();
  res.json(listStudent)
});


router.post("/update", async (req, res) => {
  const student = req.body;
  await Student.update({
    name: student.name,
    faculty: student.faculty
  },
  {where: {student_id: student.student_id}})
  await Student_Course.destroy({
    where: {
      student_id: student.student_id
    }
  })
  for (let i = 0; i< student.course_id.length; i++) {
    if (student.course_id[i] !== null) {
      await Student_Course.create({
        student_id: student.student_id,
        name: student.name,
        faculty: student.faculty,
        course_id: student.course_id[i]
      })
    }
  }
  res.json(student);
});

router.post("/", async (req, res) => {
    const student = req.body;
    const checkStudent = await Student.findByPk(student.student_id);    
    if (checkStudent === null) {
      await Student.create({
        student_id: student.student_id,
        name: student.name,
        faculty: student.faculty
      })
      for (let i = 0; i< student.course_id.length; i++) {
        if (student.course_id[i] !== null) {
          await Student_Course.create({
            student_id: student.student_id,
            name: student.name,
            faculty: student.faculty,
            course_id: student.course_id[i]
          })
        }
      }
    }
    res.json(student);
  });

module.exports = router;