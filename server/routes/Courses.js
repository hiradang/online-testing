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
router.get("/update/:id", async (req, res) => {
  const id = req.params.id
  const checkCourse = await Courses.findByPk(id);   
  res.json(checkCourse)
});

router.post("/update", async (req, res) => {
  const course = req.body;
  const teacher = await Teachers.findByPk(course.teacher_id); 
  await Courses.update({
    course_id: course.course_id,
    course_name: course.course_name,
    teacher_id: course.teacher_id,
    teacher_name: teacher.teacher_name
  },
  {where: {course_id: course.course_id}});
  res.json(course)
});

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id
  await Courses.destroy({
    where: {
      course_id: id
    }
  })
  const listCourses = await Courses.findAll();
  res.json(listCourses)
});

router.get("/", async (req, res) => {
    const listCourses = await Courses.findAll();
    res.json(listCourses)
})

router.post("/", async (req, res) => {
    const course = req.body;
    const teacher = await Teachers.findByPk(course.teacher_id); 
    const checkCourse = await Teachers.findByPk(course.course_id);   
    if (checkCourse === null) {
      await Courses.create({
        course_id: course.course_id,
        course_name: course.course_name,
        teacher_id: course.teacher_id,
        teacher_name: teacher.teacher_name
      });
    }
      res.json(course);
  });

module.exports = router;