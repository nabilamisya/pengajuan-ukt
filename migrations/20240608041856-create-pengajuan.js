'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pengajuans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      jenis_ukt: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Ukt', // Nama tabel yang direferensikan
          key: 'id'       // Kolom yang direferensikan di tabel Users
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      nama_mahasiswa: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Nama tabel yang direferensikan
          key: 'id'       // Kolom yang direferensikan di tabel Users
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      sks: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.INTEGER,
      },
        file: {
        type: Sequelize.TEXT,
      },
      valid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false // Nilai default saat baris baru ditambahkan
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pengajuans');
  }
};
