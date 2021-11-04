module.exports = (sequelize, DataTypes) => {
    const Courses = sequelize.define("Courses", {
        course_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        course_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        teacher_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        teacher_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Courses;
};