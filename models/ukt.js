'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UKT extends Model {
    static associate(models) {

    }
  }
  UKT.init({

    jenis: {
        type: DataTypes.STRING,
      },
       jenis: {
        type: DataTypes.STRING,
      },
        deskripsi: {
        type: DataTypes.STRING,
      },
  }, {
    sequelize,
    modelName: 'UKT',
    timestamps: true
    }
  );
  return UKT;
};
