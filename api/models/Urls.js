
module.exports = (sequelize, DataTypes) => {
    const Urls = sequelize.define("Urls",{
        direccion_url:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        id_usuario:{
            type:DataTypes.INTEGER(11),
            allowNull: false,
            references:{
                model: "Usuarios",
                key: "id"
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },     
    })

    return Urls
}