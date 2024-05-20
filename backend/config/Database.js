import { Sequelize } from "sequelize";

const db = new Sequelize ('db_pengajuan', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;