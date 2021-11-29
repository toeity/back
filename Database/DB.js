const Sequelize = require('sequelize');
const { config } = require('../Configs/server.config');
const db = {};
try {
    const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD,
        {
            host: config.DB_URL,
            port: config.DB_PORT,
            dialect: config.DB_DIALECT,
            operatorsAliases: false,
            pool: {
                max: config.POOL.MAX,
                min: config.POOL.MIN,
                acquire: config.POOL.ACQUIRE,
                idle: config.POOL.IDLE,
                
            }
        }
    );

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
} catch (e) {
    console.error(e.message);
}
module.exports = db;