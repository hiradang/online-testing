module.exports = (sequelize, DataTypes) => {
    const Grades = sequelize.define("Grades", {
        examId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        realTimeStart: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grade: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        isFinish: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });

    Grades.associate = (models) => {
        Grades.belongsTo(models.Exams, {
            onDelete: "cascade",
            foreignKey: "examId"
        });
    };

    Grades.associate = (models) => {
        Grades.belongsTo(models.Students, {
            onDelete: "cascade",
            foreignKey: "studentId"
        });
    };

    return Grades;
};