module.exports = (sequelize, DataTypes) => {
    const Exams = sequelize.define("Exams", {
        examId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        examName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        course_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timeStart: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        numberQuestion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        private: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    Exams.associate = (models) => {
        Exams.hasMany(models.Questions, {
            onDelete: "cascade",
            foreignKey: "examId"
        });
    };

    Exams.associate = (models) => {
        Exams.belongsTo(models.Courses, {
            onDelete: "cascade",
            foreignKey: "course_id"
        });
    };
    return Exams;
};