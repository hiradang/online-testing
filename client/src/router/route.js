
// Admin
import Students from '../pages/admin/students/Students'
import AddStudent from '../pages/admin/students/AddStudent';
import Teacher from '../pages/admin/teachers/Teacher';
import Courses from '../pages/admin/courses/Courses';
import StudentInfo from '../pages/admin/students/StudentInfo';
import TeacherInfo from '../pages/admin/teachers/TeacherInfo';
import CourseInfo from '../pages/admin/courses/CourseInfo';
import UpdateStudent from '../pages/admin/students/UpdateStudent';
import AddTeacher from '../pages/admin/teachers/AddTeacher';
import UpdateTeacher from '../pages/admin/teachers/UpdateTeacher';
import AddCourse from '../pages/admin/courses/AddCourse';
import UpdateCourse from '../pages/admin/courses/UpdateCourse';
import CourseAddStudent from '../pages/admin/courses/CourseAddStudent';

// Teacher
import ListStudent from '../pages/teacher/ListStudent'
import CourseDetail from '../pages/teacher/CourseDetail'
import AddExam from '../pages/teacher/AddExam'
import ViewExam from '../pages/teacher/ViewExam'
import EditExam from '../pages/teacher/EditExam'
import ViewStudentGrade from '../pages/teacher/ViewStudentGrade';

// Student 
import CourseDetailStudent from '../pages/student/CourseDetail'
import DoExam from '../pages/student/DoExam'
import ViewExamStudent from '../pages/student/ViewExam'

// eslint-disable-next-line import/no-anonymous-default-export
export default [ 
    {
        path: "/admin/manage/students/update/:id",
        component: UpdateStudent,
        auth: "admin"
    },
    {
        path: "/admin/manage/students",
        component: Students,
        auth: "admin"
    },
    {
        path: "/admin/manage/students/add",
        component: AddStudent,
        auth: "admin"
    },
    {
        path: "/admin/manage/teachers/add",
        component: AddTeacher,
        auth: "admin"
    },
    {
        path: "/admin/manage/teachers/update/:id",
        component: UpdateTeacher,
        auth: "admin"
    },
    {
        path: "/admin/manage/teachers",
        component: Teacher,
        auth: "admin"
    },
    {
        path: "/admin/manage/courses/add",
        component: AddCourse,
        auth: "admin"
    },
    {
        path: "/admin/manage/courses/update/:id/addStudent",
        component: CourseAddStudent,
        auth: "admin"
    },
    {
        path: "/admin/manage/courses/update/:id",
        component: UpdateCourse,
        auth: "admin"
    },
    {
        path: "/admin/manage/courses",
        component: Courses,
        auth: "admin"
    },
    {
        path: "/admin/manage/students/:id",
        component: StudentInfo,
        auth: "admin"
    },
    {
        path: "/admin/manage/teachers/:id",
        component: TeacherInfo,
        auth: "admin"
    },
    {
        path: "/admin/manage/courses/:id",
        component: CourseInfo,
        auth: "admin"
    },

    // teacher
    {
        path: "/teacher/:teacherId/:courseId/view-student",
        component: ListStudent,
        auth: "teacher"
    },
    {
        path: "/teacher/:teacherId/:courseId",
        component: CourseDetail,
        auth: "teacher"
    },
    {
        path: "/teacher/:teacherId/:courseId/new-exam:numberExam",
        component: AddExam,
        auth: "teacher"
    },    
    {
        path: "/teacher/:teacherId/:courseId/view-exam/:examId",
        component: ViewExam,
        auth: "teacher"
    },
    {
        path: "/teacher/:teacherId/:courseId/edit-exam/:examId",
        component: EditExam,
        auth: "teacher"
    },
    {
        path: "/teacher/:teacherId/:courseId/view-grade/:examId",
        component: ViewStudentGrade,
        auth: "teacher"
    },
    {
        path: "/teacher/:teacherId/:courseId/view-grade/:examId",
        component: ViewStudentGrade
    },
    

    //student
    {
        path: "/student/:studentId/:courseId",
<<<<<<< HEAD
        component: CourseDetailStudent
    },
    {
        path: "/student/:studentId/:courseId/do-exam/:examId",
        component: DoExam
    },
    {
        path: "/student/:studentId/:courseId/view-exam/:examId",
        component: ViewExamStudent
=======
        component: CourseDetailStudent,
        auth: "student"
    },
    {
        path: "/student/:studentId/:courseId/do-exam/:examId",
        component: DoExam,
        auth: "student"
    },
    {
        path: "/student/:studentId/:courseId/view-exam/:examId",
        component: ViewExamStudent,
        auth: "student"
>>>>>>> login
    },
];
