const express = require('express');
const router = express.Router();
const {Teachers} = require('../models');
const {Courses}= require('../models/');

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  const teacherInfo = await Courses.findAll({
    where: {teacher_id : id},
    include: [
      Teachers  
    ]
  });
  res.json(teacherInfo)
})

router.get("/", async (req, res) => {
    const listTeachers = await Teachers.findAll();
    res.json(listTeachers)
})

router.post("/", async (req, res) => {
    const teacher = req.body;
    await Teachers.create(teacher);
    res.json(teacher);
  });

module.exports = router;