module.exports = (sequelize, DataTypes) => {
    const Teachers = sequelize.define("Teachers", {
        teacher_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        teacher_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Teachers;
};