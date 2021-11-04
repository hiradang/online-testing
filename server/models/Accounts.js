module.exports = (sequelize, DataTypes) => {
    const Accounts = sequelize.define("Accounts", {
        id_account: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Accounts;
};