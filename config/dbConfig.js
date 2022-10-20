module.exports = {
    HOST: process.env.MYSQL_HOST_NAME,
    USER: process.env.MYSQL_USER_NAME,
    PASSWORD: process.env.MYSQL_PASSWORD,
    DB: process.env.MYSQL_DB_NAME,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idel: 10000
    }
}