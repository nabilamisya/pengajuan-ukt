const { Pengajuan, Perbaikan, Dataaset } = require('../models');
const multer = require('multer')
const path = require('path');
const { where } = require('sequelize');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', 'public', 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


const upload = multer({
    storage: storage,
});
exports.uploadd = upload.single('file')

exports.putPengajuanStatus = async (req, res) => {
    try {
        const { status, id } = req.body;


        await Pengajuan.update({
            status: status
        }, {
            where: {
                id: id
            }
        })

        res.redirect('/admin/pengajuan'); // Pengalihan ke halaman admin/lab setelah berhasil
    } catch (error) {
        console.error('Error adding perbaikan:', error);
        res.redirect('/mahasiswa/pengajuan?error=Failed to update pengajuan');
    }
};

exports.addPengajuan = async (req, res) => {
       const user = req.cookies.user;
    try {
        const {jenis_ukt, sks,} = req.body;

         const file_uploaded = req.file

        const createData = {
            jenis_ukt: jenis_ukt?.trim(),
            sks:sks,
            nama_mahasiswa:user?.nama?.trim(),
            status:0
        };

        // Jika file diunggah, tambahkan properti file ke dalam objek pembaruan
        if (file_uploaded) {
            createData.file = file_uploaded.originalname;
        }
        await Pengajuan.create(createData)
        res.redirect('/mahasiswa/riwayatpengajuan');
    } catch (error) {
        console.error('Error adding submissions:', error);
        res.redirect('/mahasiswa/pengajuan?error=Failed to add submissions');
    }
};

exports.putPengajuan = async (req, res) => {
       const user = req.cookies.user;
    try {
        const {jenis_ukt, sks, id_pengajuan} = req.body;

         const file_uploaded = req.file

        const updateData = {
            jenis_ukt: jenis_ukt?.trim(),
            sks:sks,
            nama_mahasiswa:user?.nama?.trim(),
            status:0
        };

        // Jika file diunggah, tambahkan properti file ke dalam objek pembaruan
        if (file_uploaded) {
            updateData.file = file_uploaded.originalname;
        }
      await Pengajuan.update(updateData, { where: { id: id_pengajuan } });
        res.redirect('/mahasiswa/riwayatpengajuan');
    } catch (error) {
        console.error('Error adding submissions:', error);
        res.redirect('/mahasiswa/pengajuan?error=Failed to add submissions');
    }
};

exports.deletePengajuan = async (req, res, next) => {
    try {
        const pengajuan = await Pengajuan.findByPk(req.params.id);
        if (!pengajuan) {
            return res.status(404).send('Aset Tidak Ditemukan');
        }
        await pengajuan.destroy();
        res.redirect('/mahasiswa/riwayatpengajuan');
    } catch (error) {
        next(error);
    }
};

exports.getEditPengajuan = async (req, res, next) => {
    try {
        const pengajuan = await Pengajuan.findByPk(req.params.id);
        if (!pengajuan) {
            return res.status(404).json({ error: 'Lab not found' });
        }
        res.json(pengajuan); // Mengirim data laboratorium dalam format JSON
    } catch (error) {
        console.error('Error fetching lab data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
