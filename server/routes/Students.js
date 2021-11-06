const express = require('express');
const router = express.Router();
const {Students} = require('../models')

router.get("/", async (req, res) => {
    const listStudent = await Students.findAll();
    res.json(listStudent)
})

router.post("/", async (req, res) => {
    const student = req.body;
    await Students.create(student);
    res.json(student);
  });

module.exports = router;