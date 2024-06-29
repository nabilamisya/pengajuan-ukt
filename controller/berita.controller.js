const { Beritas, Perbaikan, Dataaset,} = require('../models');
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


exports.addBerita = async (req, res) => {
       const user = req.cookies.user;
    try {
        const {judul, deskripsi,} = req.body;

         const file_uploaded = req.file

        const createData = {
            judul:judul,
            deskripsi:deskripsi
           
        };

        // Jika file diunggah, tambahkan properti file ke dalam objek pembaruan
        if (file_uploaded) {
            createData.file = file_uploaded.originalname;
        }
        await Beritas.create(createData)
        res.redirect('/admin/berita');
    } catch (error) {
        console.error('Error adding submissions:', error);
        res.redirect('/admin/berita?error=Failed to add submissions');
    }
};

exports.putBerita = async (req, res) => {
       const user = req.cookies.user;
    try {
        const {judul, deskripsi, id} = req.body;

         const file_uploaded = req.file

        const updateData = {
            judul: judul,
            deskripsi: deskripsi
        };

        // Jika file diunggah, tambahkan properti file ke dalam objek pembaruan
        if (file_uploaded) {
            updateData.file = file_uploaded.originalname;
        }
      await Beritas.update(updateData, { where: { id: id } });
        res.redirect('/admin/berita');
    } catch (error) {
        console.error('Error adding submissions:', error);
        res.redirect('/admin/berita?error=Failed to add submissions');
    }
};

exports.deleteBerita = async (req, res, next) => {
    try {
        const beritasData = await Beritas.findByPk(req.params.id);
        if (!beritasData) {
            return res.status(404).send('Berita Tidak Ditemukan');
        }
        await Beritas.destroy({
            where:{id:req.params.id}
        });
        res.redirect('/admin/berita');
    } catch (error) {
        next(error);
    }
};

exports.getEditBeritas = async (req, res, next) => {
    try {
        const beritasData = await Beritas.findByPk(req.params.id);
        if (!beritasData) {
            return res.status(404).json({ error: 'Berita not found' });
        }
        res.json(beritasData); // Mengirim data laboratorium dalam format JSON
    } catch (error) {
        console.error('Error fetching berita data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
