const express = require('express');
const router = express.Router();
const {Teachers} = require('../models')

router.get("/", async (req, res) => {
    const listTeachers = await Teachers.findAll();
    res.json(listTeachers)
})

router.post("/", async (req, res) => {
    const teacher = req.body;
    await Teachers.create(teacher);
    res.json(teacher);
  });

module.exports = router;