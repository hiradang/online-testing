const express = require('express');
const router = express.Router();
const {Accounts} = require('../models')

router.get("/", async (req, res) => {
    const listAccounts = await Accounts.findAll();
    res.json(listAccounts)
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Accounts.findByPk(username);
  if (!user) res.json({ error: "User Doesn't Exist" });
  if (user.password !== password) res.json({ error: "Wrong Username And Password Combination" });
  res.json("YOU LOGGED IN!!!");
});

module.exports = router;