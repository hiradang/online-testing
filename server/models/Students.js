module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define("Students", {
        student_id: {
            type: DataTypes.STRING,
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
    },
    {
        indexes: [{
            unique: true,
            fields: ['student_id']
        }]
    });
    
    return Students;
};