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
  
  Questions.update({
    questionContent: updateQuestion.questionContent,
    result : updateQuestion.result,
    choice1 : updateQuestion.choice1,
    choice2 : updateQuestion.choice2,
    choice3 : updateQuestion.choice3
  },
  {where: {id: questionId}})
  res.send("question updated");
});

// router.post("/:questionId", async (req, res) => {
//   const questionId = req.params.questionId;
//   const updateQuestion = req.body;

//   const [result, metadata] = await 
//   sequelize.query(`UPDATE questions SET
//   questionContent = "${updateQuestion.questionContent}", 
//   result = "${updateQuestion.result}", 
//   choice1 = "${updateQuestion.choice1}", 
//   choice2 = "${updateQuestion.choice2}", 
//   choice3 = "${updateQuestion.choice3}" 
//   WHERE id = ${questionId}`);

//   res.send("question updated");
// });

router.delete("/:examId", async (req, res) => {
  const examId = req.params.examId;
  await Questions.destroy({
    where: {
      examId: examId
    }
  })
  res.send("Questions deleted")
});

module.exports = router;