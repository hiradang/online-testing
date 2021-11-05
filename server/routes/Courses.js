const express = require('express');
const router = express.Router();
const {Courses} = require('../models')
const {Teachers} = require('../models')

router.get("/:teacherId", async (req, res) => {
  let teacherId = req.params.teacherId;
  const teacherInfo = await Courses.findAll({
    where: {teacher_id : teacherId},
    include: [
      Teachers  
    ]
  });
  res.json(teacherInfo)
})


router.get("/", async (req, res) => {
    const listCourses = await Courses.findAll();
    res.json(listCourses)
})

router.post("/", async (req, res) => {
    const course = req.body;
    await Courses.create(course);
    res.json(course);
  });

module.exports = router;