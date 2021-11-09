const express = require('express');
const router = express.Router();
const {Teachers} = require('../models');
const Accounts = require('../models/Accounts');

router.get("/:id", async (req, res) => {
  let teacher_id = req.params.id;
  const teacher = await Teachers.findByPk(teacher_id); 
  res.json(teacher)
})

router.get("/", async (req, res) => {
  const listTeachers = await Teachers.findAll();
  res.json(listTeachers)
})

router.post("/update", async (req, res) => {
  const teacher = req.body;
  await Teachers.update({
    teacher_name: teacher.teacher_name,
    email: teacher.email
  },
  {where: {teacher_id: teacher.teacher_id}})
  res.json(teacher);
});

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id
  await Teachers.destroy({
    where: {
      teacher_id: id
    }
  })
  await Accounts.destroy({
    where: {
      id_account: id
    }
  })
  const listTeachers = await Teachers.findAll();
  res.json(listTeachers)
});

router.post("/", async (req, res) => {
    const teacher = req.body;
    const checkTeacher = await Teachers.findByPk(teacher.teacher_id);    
    if (checkTeacher === null) {
      await Teachers.create(teacher);
      await Accounts.create({
        id_account: teacher.student_id,
        password: teacher.student_id,
        role: "teacher"
      })
      res.json(teacher);
    }
  });

module.exports = router;