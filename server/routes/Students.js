const express = require('express');
const router = express.Router();
const {Students} = require('../models');
const {Student_Course} = require('../models');
const {Accounts} = require('../models');

router.get("/:id", async (req, res) => {
  const id = req.params.id
  const student = await Students.findByPk(id,{
    attributes: ['student_id', 'name', 'faculty']
  });
  res.json(student)
})

router.get("/", async (req, res) => {
    const listStudent = await Students.findAll({
      attributes: ['student_id', 'name', 'faculty']
    });
    res.json(listStudent)
})

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id
  await Students.destroy({
    where: {
      student_id: id
    }
  })
  await Student_Course.destroy({
    where: {
      student_id: id
    }
  })
  await Accounts.destroy({
    where: {
      id_account: id
    }
  })
  const listStudent = await Students.findAll({
    attributes: ['student_id', 'name', 'faculty']
  });
  res.json(listStudent)
});


router.post("/update", async (req, res) => {
  const student = req.body;
  await Students.update({
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
    const checkStudent = await Students.findByPk(student.student_id);    
    if (checkStudent !== null) res.json({error : "User đã tồn tại"})
    else if (checkStudent === null) {
      await Students.create({
        student_id: student.student_id,
        name: student.name,
        faculty: student.faculty
      })
      await Accounts.create({
        id_account: student.student_id,
        password: student.student_id,
        role: "student"
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