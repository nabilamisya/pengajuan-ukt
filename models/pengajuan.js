// models/pengajuan.js

'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Pengajuan extends Model {
        static associate(models) {
            Pengajuan.belongsTo(models.User, {
                foreignKey: 'nama_mahasiswa',
                as: 'mahasiswa' // Alias untuk relasi
            });
        }
    }
    Pengajuan.init({
        jenis_ukt: {
            type: DataTypes.INTEGER,
            references: {
              model: 'UKT',
              key: 'id'
            }
          },
          nama_mahasiswa: {
            type: DataTypes.INTEGER,
            references: {
              model: 'User',
              key: 'id'
            }
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
