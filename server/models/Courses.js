module.exports = (sequelize, DataTypes) => {
    const Courses = sequelize.define("Courses", {
        course_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
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
    },
    {
        indexes: [{
            unique: true,
            fields: ['course_id']
        }]
    });
    Courses.associate = (models) => {
        Courses.hasMany(models.Student_Course, {
          onDelete: "cascade",
          foreignKey: "course_id"
        });
    };
    Courses.associate = (models) => {
        Courses.belongsTo(models.Teachers, {
            onDelete: "cascade",
            foreignKey: "teacher_id"
            });
    };
    return Courses;
};