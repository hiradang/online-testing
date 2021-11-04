const express = require('express');
const router = express.Router();
const {Courses} = require('../models')

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