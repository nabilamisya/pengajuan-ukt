const express = require('express');
const router = express.Router();
const {User, Pengajuan, Beritas} = require('../models');
const { putPengajuan, putPengajuanStatus, uploadd } = require('../controller/pengajuan.controller');
const { addBerita, putBerita, getEditBeritas, deleteBerita } = require('../controller/berita.controller');




router.get("/pengajuan", async (req, res) => {
     const user = req.cookies.user;
    try {

        const items = await Pengajuan.findAll({
        });
        res.render('admin/pengajuan', {
            title: 'Pengajuan', items
           
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get("/berita", async (req, res) => {
    const user = req.cookies.user;
    try {

        const beritas = await Beritas.findAll({
        });
        res.render('admin/berita', {
            title: 'Berita', beritas

        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get("/pengajuan-generate", async (req, res) => {

    try {

        const items = await Pengajuan.findAll({
        });
        res.render('admin/pengajuan-generate', {
            title: 'Pengajuan', items

        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
 
});


router.post("/berita", uploadd, addBerita)
router.post("/berita/edit", uploadd, putBerita)
router.get("/berita/:id", getEditBeritas)
router.post("/berita/delete/:id", deleteBerita)
module.exports = router;
