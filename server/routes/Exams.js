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

// Get an exam based on examId
router.get("/examId/:examId", async (req, res) => {
  const examId = req.params.examId;
  const exam = await Exams.findByPk(examId);
  res.json(exam);
})

router.get("/", async (req, res) => {
    const listExams = await Exams.findAll();
    res.json(listExams)
})


// Create a new exam
router.post("/", async (req, res) => {
    const exam = req.body;
    await Exams.create(exam);
    res.json(exam);
});


router.delete("/:examId", async (req, res) => {
  const examId = req.params.examId;
  await Exams.destroy({
    where: {
      examId: examId
    }
  })
  console.log(`Exam ${examId} deleted!`);
});


// Update Exam
router.post("/:examId", async (req, res) => {
  const examId = req.params.examId;
  const updateExam = req.body;
  
  const exam = await Exams.findByPk(examId);
  exam.update({
   examName : updateExam.examName,
   duration : updateExam.duration,
   numberQuestion : updateExam.numberQuestion,
   timeStart : updateExam.timeStart
  })

  await exam.save();
  res.send(" exam updated");
});

module.exports = router;