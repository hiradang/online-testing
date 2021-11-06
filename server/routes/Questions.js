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

module.exports = router;