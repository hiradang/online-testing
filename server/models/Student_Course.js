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
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    Student_Course.associate = (models) => {
        Student_Course.belongsTo(models.Courses, {
          onDelete: "cascade",
          foreignKey: "course_id"
        });
      };
    return Student_Course;
};