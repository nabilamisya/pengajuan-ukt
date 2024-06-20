import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const PermohonanUkts = db.define ('permohonan_ukts', {
    id_permohonan : {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false, 
        validate:{
            notEmpty: true
        }
    },
    id_keringanan : {
        type: DataTypes.INTEGER,
        // deferrable: Deferrable.INITIALLY_IMMEDIATE,
        allowNull:false,
        validate: {
            notEmpty: true
        }
    },
    id_mahasiswa : {
        type: DataTypes.INTEGER,
        // deferrable: Deferrable.INITIALLY_IMMEDIATE,
        allowNull:false,
        validate: {
            notEmpty: true
        }
    },
    status_permohonan : {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            notEmpty: true
        }
    },
    semester_tujuan : {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate: {
            notEmpty:true
        }
    },
    sks : {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            notEmpty:true
        }
    },
    ktm : {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            notEmpty:true
        }
    },
    ktp_mhs : {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            notEmpty: true
        }
    },
    ktp_ortu : {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            notEmpty:true
        }
    },
    kk : {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            notEmpty: true
        }
    },
    doc_permohonan : {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            notEmpty:{
                notEmpty: true
            }
        }
    },
    slip_gaji : {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            notEmpty: true
        }
    },
    rumah : {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            notEmpty: true
        }
    },
    transkrip : {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

export default PermohonanUkts;