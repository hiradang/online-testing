const express = require('express');
const router = express.Router();
const {Accounts} = require('../models')

router.get("/", async (req, res) => {
    const listAccounts = await Accounts.findAll();
    res.json(listAccounts)
})

router.post("/", async (req, res) => {
    const account = req.body;
    await Accounts.create(account);
    res.json(account);
  });

module.exports = router;