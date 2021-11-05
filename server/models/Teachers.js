module.exports = (sequelize, DataTypes) => {
    const Teachers = sequelize.define("Teachers", {
        teacher_id: {
            type: DataTypes.STRING,
            primaryKey: true,
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
    Teachers.associate = (models) => {
        Teachers.hasMany(models.Courses, {
          onDelete: "cascade",
          foreignKey: "teacher_id"
        });
      };
    return Teachers;
};