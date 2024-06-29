// models/Berita.js

'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Beritas extends Model {
        static associate(models) {
            // Definisikan asosiasi jika ada
        }
    }
    Beritas.init({
        judul: {
            type: DataTypes.STRING,
        },
        deskripsi: {
            type: DataTypes.STRING,
        },
        file: {
            type: DataTypes.TEXT,
        },
    }, {
        sequelize,
        modelName: 'Beritas',
        timestamps: true,
    });
    return Beritas;
};
