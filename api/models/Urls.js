
module.exports = (sequelize, DataTypes) => {
    const Urls = sequelize.define("Urls",{
        direccion_url:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        id_usuario:{
            type:DataTypes.STRING
        }   
    })

    return Urls
}