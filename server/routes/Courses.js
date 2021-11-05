const express = require('express');
const router = express.Router();
const {Courses} = require('../models')
const {Student_Course} = require('../models')

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  const courseInfo = await Student_Course.findAll({
    where: {course_id : id},
    include: [
      Courses  
    ]
  });
  res.json(courseInfo)
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