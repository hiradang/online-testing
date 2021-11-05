module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("Student", {
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
        }
    });
    
    return Student;
};