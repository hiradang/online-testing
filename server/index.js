const express = require('express');
const app = express();
const cors = require('cors');
const db = require("./models");

app.use(cors()); 
app.use(express.json({strict: false}));

//Router
const studentRouter = require("./routes/Students")
app.use("/admin/manage/students", studentRouter);

const teacherRouter = require("./routes/Teachers")
app.use("/admin/manage/teachers", teacherRouter);

const courseRouter = require("./routes/Courses")
app.use("/admin/manage/courses", courseRouter);

const studentCourseRouter = require("./routes/Student_Course")
app.use("/admin/manage/student-course", studentCourseRouter);

const examRouter = require("./routes/Exams")
app.use("/admin/manage/exams", examRouter);

const questionRouter = require("./routes/Questions")
app.use("/admin/manage/questions", questionRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});