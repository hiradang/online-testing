const express = require('express');
const { sequelize } = require('./models');
const app = express();
const db = require("./models");
const cors = require('cors')

app.use(express.json());
app.use(cors());

//Router
const studentRouter = require("./routes/Students")
app.use("/admin/manage/students", studentRouter);

const teacherRouter = require("./routes/Teachers")
app.use("/admin/manage/teachers", teacherRouter);

const courseRouter = require("./routes/Courses")
app.use("/admin/manage/courses", courseRouter);


db.sequelize.sync().then(() => {
app.listen(3001, () => {
    console.log("Server running on port 3001");
});
});