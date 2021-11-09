
// Teacher
import ListStudent from '../pages/teacher/ListStudent'
import CourseDetail from '../pages/teacher/CourseDetail'
import AddExam from '../pages/teacher/AddExam'
import ViewExam from '../pages/teacher/ViewExam'
import EditExam from '../pages/teacher/EditExam'

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
// eslint-disable-next-line import/no-anonymous-default-export
export default [ 
    {
        path: "/admin/manage/students/update/:id",
        component: UpdateStudent
    },
    {
        path: "/admin/manage/students",
        component: Students
    },
    {
        path: "/admin/manage/students/add",
        component: AddStudent
    },
    {
        path: "/admin/manage/teachers/add",
        component: AddTeacher
    },
    {
        path: "/admin/manage/teachers/update/:id",
        component: UpdateTeacher
    },
    {
        path: "/admin/manage/teachers",
        component: Teacher
    },
    {
        path: "/admin/manage/courses/add",
        component: AddCourse
    },
    {
        path: "/admin/manage/courses/update/:id/addStudent",
        component: CourseAddStudent
    },
    {
        path: "/admin/manage/courses/update/:id",
        component: UpdateCourse
    },
    {
        path: "/admin/manage/courses",
        component: Courses
    },
    {
        path: "/admin/manage/students/:id",
        component: StudentInfo
    },
    {
        path: "/admin/manage/teachers/:id",
        component: TeacherInfo
    },
    {
        path: "/admin/manage/courses/:id",
        component: CourseInfo
    },

    // teacher
    {
        path: "/teacher/:teacherId/:courseId/view-student",
        component: ListStudent
    },
    {
        path: "/teacher/:teacherId/:courseId",
        component: CourseDetail
    },
    {
        path: "/teacher/:teacherId/:courseId/new-exam:numberExam",
        component: AddExam
    },    
    {
        path: "/teacher/:teacherId/:courseId/view-exam/:examId",
        component: ViewExam
    },
    {
        path: "/teacher/:teacherId/:courseId/edit-exam/:examId",
        component: EditExam
    },
    
];
