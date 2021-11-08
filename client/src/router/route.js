
// Admin
import Students from '../pages/admin/Students'
import AddStudent from '../pages/admin/AddStudent';
import Teacher from '../pages/admin/Teacher';
import Courses from '../pages/admin/Courses';
import StudentInfo from '../pages/admin/StudentInfo';
import TeacherInfo from '../pages/admin/TeacherInfo';
import CourseInfo from '../pages/admin/CourseInfo';
import UpdateStudent from '../pages/admin/UpdateStudent';

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
        path: "/admin/manage/teachers",
        component: Teacher
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
];
