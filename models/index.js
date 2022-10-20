const { Sequelize, DataTypes } = require("sequelize")
const dbConfig = require("../config/dbConfig")

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idel
        }
    })

sequelize.authenticate().then(() => {
    console.log("connected...");
}).catch(err => {
    console.log("error", err);
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require("./users.js")(sequelize, DataTypes)

db.sequelize.sync({ force: false }).then(() => {
    console.log("yes re-sync done !!");
}).catch(err => {
    console.log("error", err);
})

module.exports = db