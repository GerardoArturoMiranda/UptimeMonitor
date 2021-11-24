
module.exports = (sequelize, DataTypes) => {
    const Historiales = sequelize.define("Historiales",{
        status:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        id_url:{
            type:DataTypes.STRING,
            allowNull: false,
            
        },     
    })

    return Historiales
}