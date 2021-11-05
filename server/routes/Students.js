const express = require('express');
const router = express.Router();
const {Student} = require('../models')
const {Student_Course} = require('../models')
const {Courses} = require('../models')

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  const studentInfo = await Student_Course.findAll({
    where: {student_id : id},
    include: [
      Courses  
    ]
  });
  res.json(studentInfo)
})

router.get("/", async (req, res) => {
    const listStudent = await Student.findAll();
    res.json(listStudent)
})

router.post("/", async (req, res) => {
    const student = req.body;
    await Student.create(student);
    res.json(student);
  });

module.exports = router;