const express = require('express');
const router = express.Router();
const { Grades } = require('../models')

// Get grade based on examId and studentId
router.get("/:studentId/:examId", async (req, res) => {
  const examId = req.params.examId;
  const studentId = req.params.studentId;
  const grade = await Grades.findAll({
      where: {
        examId: examId,
        studentId: studentId
      }
  });
  res.json(grade);
})

// Get grade based on examId
router.get("/examId/:examId", async (req, res) => {
    const examId = req.params.examId;
    const grade = await Grades.findAll({
        where: {
          examId: examId
        }
    });
    res.json(grade);
  })

  // Get grade based on studentId
router.get("/studentId/:studentId", async (req, res) => {
    const studentId = req.params.studentId;
    const grade = await Grades.findAll({
        where: {
            studentId: studentId
        }
    });
    res.json(grade);
  })

router.get("/", async (req, res) => {
    const listGrades = await Grades.findAll();
    res.json(listGrades)
})


// Create a new exam
router.post("/", async (req, res) => {
    const grade = req.body;
    await Grades.create(grade);
    res.json(grade);
});


// Update Exam
// router.post("/:examId", async (req, res) => {
//   const examId = req.params.examId;
//   const updateExam = req.body;
  
//   const exam = await Grades.findByPk(examId);
//   exam.update({
//    examName : updateExam.examName,
//    duration : updateExam.duration,
//    numberQuestion : updateExam.numberQuestion,
//    timeStart : updateExam.timeStart
//   })

//   await exam.save();
//   res.send(" exam updated");
// });

module.exports = router;