const { Sequelize } = require('sequelize');
require('dotenv').config()

// Conexión sin especificar una base de datos concreta
const sequelize = new Sequelize('', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
});

async function createDatabase() {
    try {
        // Ejecutar una consulta SQL para crear la base de datos
        await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE};`);
        console.log('Base de datos creada exitosamente.');
    } catch (error) {
        console.error('Error al crear la base de datos:', error);
    } finally {
        await sequelize.close();
    }
}

createDatabase();