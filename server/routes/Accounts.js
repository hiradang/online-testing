const express = require('express');
const router = express.Router();
const {Accounts} = require('../models')
const {sign} = require('jsonwebtoken')
const bcrypt = require("bcrypt");

router.get("/update/", async (req, res) => {
  // for (let i = 1001; i<= 1264; i++) {
  //   var user = "uet"+ i.toString();
  //   await bcrypt.hash(user, 10).then((hash) => {
  //     console.log(hash)
  //     Accounts.update({
  //       password: hash
  //     },
  //     {where: {id_account: user}});
  //   });
  // }
  // for (let i = 21020001; i<= 21021679; i++) {
  //     var user = i.toString();
  //     await bcrypt.hash(user, 10).then((hash) => {
  //       Accounts.update({
  //         password: hash
  //       },
  //       {where: {id_account: user}});
  //     });
  //   }
  res.json({status:"done"})
})

router.put("/update/:id", async (req, res) => {
  const id =req.params.id;
  const { newPass, password } = req.body;
  const user = await Accounts.findByPk(id);
  bcrypt.compare(password, user.password).then(async (match) => {
    //console.log(match)
    if (!match) res.json({ error: "Wrong Username And Password Combination" });
    bcrypt.hash(newPass, 10).then((hash) => {
      Accounts.update({
        password: hash
      },
      {where: {id_account: id}});
    });
    res.json(user)
  });
})

router.post("/update", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
  Accounts.update({
    password: hash
  },
  {where: {id_account: username}});
});
  res.json(password)
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Accounts.findByPk(username);
  if (!user) res.json({ error: "User Doesn't Exist" });
  bcrypt.compare(password, user.password).then(async (match) => {
    //console.log(match)
    if (!match) res.json({ error: "Wrong Username And Password Combination" });
    if (password === username) {
      res.json({warn: "Change password",user})
    }
    res.json(user);
  });

  //if (user.password !== password) res.json({ error: "Wrong Username" });
  // const accessToken = sign(
  //   {role: user.role, id: user.id_account},
  //   "importantsecret"
  //   );
  
  
});

module.exports = router;