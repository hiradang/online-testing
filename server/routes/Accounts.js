const express = require('express');
const router = express.Router();
const {Accounts} = require('../models')
const {sign} = require('jsonwebtoken')

router.get("/", async (req, res) => {
    const listAccounts = await Accounts.findAll();
    res.json(listAccounts)
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Accounts.findByPk(username);
  if (!user) res.json({ error: "User Doesn't Exist" });
  if (user.password !== password) res.json({ error: "Wrong Username And Password Combination" });
  // const accessToken = sign(
  //   {role: user.role, id: user.id_account},
  //   "importantsecret"
  //   );
  res.json(user);
  
});

module.exports = router;