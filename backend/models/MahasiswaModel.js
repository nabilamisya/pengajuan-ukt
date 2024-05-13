import { Sequelize, UUID } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Mahasiswa = db.define ('tb_mahasiswa', {
    UUID: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    birthplace: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    gender: {
        type: DataTypes.ENUM('Laki-Laki', 'Perempuan'),
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    faculty: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    study_program: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    enrollment_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

Users.hasOne(Mahasiswa, { foreignKey: 'user_id' });
Mahasiswa.belongsTo(Users, {foreignKey: 'user_id'});

export default Mahasiswa;