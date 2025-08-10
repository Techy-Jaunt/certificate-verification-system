const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        dialect: "postgres",
        logging: false,
    }
);

const connectPostgres = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ PostgreSQL connected");
    } catch (error) {
        console.error("❌ PostgreSQL connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = { sequelize, connectPostgres };
