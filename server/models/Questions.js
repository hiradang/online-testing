module.exports = (sequelize, DataTypes) => {
    const Questions = sequelize.define("Questions", {
        examId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        questionContent: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        result: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        choice1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        choice2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        choice3: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Questions;
};