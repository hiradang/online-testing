const express = require('express');
const router = express.Router();
const { Exams } = require('../models')

router.get("/:courseId", async (req, res) => {
  let courseId = req.params.courseId;
  const examsInfo = await Exams.findAll({
    where: {course_id : courseId},
  });
  res.json(examsInfo)
})

router.get("/", async (req, res) => {
    const listExams = await Exams.findAll();
    res.json(listExams)
})

router.post("/", async (req, res) => {
    const exam = req.body;
    await Exams.create(exam);
    res.json(exam);
});

module.exports = router;