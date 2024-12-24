
module.exports = {
    HOST: "127.0.0.1",
    PORT: 5432,
    USER: "postgres",
    PASSWORD: "mardino",
    DB: "postgres",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};