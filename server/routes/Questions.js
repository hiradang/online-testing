const express = require('express');
const router = express.Router();
const {Questions} = require('../models')

router.get("/:examId", async (req, res) => {
  let examId = req.params.examId;
  const QuestionsList = await Questions.findAll({
    where: {ExamId : examId},
  });
  res.json(QuestionsList)
})

router.get("/", async (req, res) => {
    const listQuestions = await Questions.findAll();
    res.json(listQuestions)
})

router.post("/", async (req, res) => {
    const question = req.body;
    await Questions.create(question);
    res.json(question);
});

// Edit question
router.post("/:questionId", async (req, res) => {
  const questionId = req.body.id;
  const updateQuestion = req.body;
  
  const question = await Questions.findByPk(questionId);
  question.update({
    questionContent: updateQuestion.questionContent,
    result : updateQuestion.result,
    choice1 : updateQuestion.choice1,
    choice2 : updateQuestion.choice2,
    choice3 : updateQuestion.choice3
  })

  await question.save();
  res.send("question updated");
});

module.exports = router;