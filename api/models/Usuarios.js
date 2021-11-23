
module.exports = (sequelize, DataTypes) => {
    const Usuarios = sequelize.define("Usuarios",{
        nombre:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        correo:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        auth_id:{
            type:DataTypes.INTEGER(11),
            allowNull: false,
        },
               
    })

    return Usuarios
}