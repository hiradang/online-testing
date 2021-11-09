module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define("Students", {
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
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
    
    return Students;
};