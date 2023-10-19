module.exports = (sequelize, Sequelize) => {
    const Phone = sequelize.define("phones", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        contactId:{
            type: Sequelize.INTEGER,
            nullable: false,
        },
        name:{
            type: Sequelize.STRING,
            nullable: false,
        },
        number:{
            type: Sequelize.STRING,
            nullable: false,
        },
        // DEFINE YOUR MODEL HERE
    });
    
    return Phone;
};