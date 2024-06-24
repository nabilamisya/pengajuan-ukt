// models/pengajuan.js

'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Pengajuan extends Model {
        static associate(models) {
            // Definisikan asosiasi jika ada
        }
    }
    Pengajuan.init({
        jenis_ukt: {
            type: DataTypes.STRING,
        },
        nama_mahasiswa: {
            type: DataTypes.STRING,
        },
        sks: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.INTEGER,
        },
        file: {
            type: DataTypes.TEXT,
        },
    }, {
        sequelize,
        modelName: 'Pengajuan',
        timestamps: true,
    });
    return Pengajuan;
};
