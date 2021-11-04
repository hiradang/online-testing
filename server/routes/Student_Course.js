const express = require('express');
const router = express.Router();
const {Student_Course} = require('../models')

router.get("/", async (req, res) => {
    const listStudent_Course = await Student_Course.findAll();
    res.json(listStudent_Course)
})

router.post("/", async (req, res) => {
    const newStudent_course = req.body;
    await Student_Course.create(newStudent_course);
    res.json(newStudent_course);
  });

module.exports = router;