
module.exports = (sequelize, DataTypes) => {
    const Historiales = sequelize.define("Historiales",{
        status:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        id_url:{
            type:DataTypes.INTEGER(11),
            allowNull: false,
            references:{
                model: "Urls",
                key: "id"
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },     
    })

    return Historiales
}