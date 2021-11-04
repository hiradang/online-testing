module.exports = (sequelize, DataTypes) => {
    const Student_Course = sequelize.define("Student_Course", {
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        faculty: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        course_id: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Student_Course;
};