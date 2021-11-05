const express = require('express');
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

const studentCourseRouter = require("./routes/Student_Course")
app.use("/admin/manage/student-course", studentCourseRouter);

db.sequelize.sync().then(() => {
app.listen(3001, () => {
    console.log("Server running on port 3001");
});
});