const express = require('express');
const router = express.Router();
const { Pengajuan, UKT} = require('../models');
const { uploadd, addPengajuan, putPengajuan, deletePengajuan, getEditPengajuan } = require('../controller/pengajuan.controller');

router.get("/dashboard", async (req, res) => {
        const user = req.cookies.user;
    try {
        const approve = await Pengajuan.findAll({
            where: { status: 1, nama_mahasiswa:user?.nama?.trim() }
        });
        const reject = await Pengajuan.findAll({
            where: { status: 2,  nama_mahasiswa:user?.nama?.trim() }
        });
        const process = await Pengajuan.findAll({
            where: { status: 0,  nama_mahasiswa:user?.nama?.trim() }
        });

        res.render('mahasiswa/dashboard', {
            title: 'Dashboard Mahasiswa',
            approve: approve.length,
            reject: reject.length,
            process: process.length
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get("/suratpengajuan", async (req, res) => {
    try {

        res.render('mahasiswa/suratpengajuan', {
            title: 'Surat Pengajuan',
           
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get("/riwayatpengajuan", async (req, res) => {
     const user = req.cookies.user;
    try {

        const items = await Pengajuan.findAll({
              where: { nama_mahasiswa:user?.nama?.trim() }
        });
         const ukt = await UKT.findAll({
        });
        res.render('mahasiswa/riwayat_pengajuan', {
            title: 'Riwayat Pengajuan', items, ukt
           
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/tambah/pengajuan", uploadd, addPengajuan)
router.post("/update/pengajuan", uploadd, putPengajuan)
router.post("/delete/pengajuan/:id",deletePengajuan)
router.get("/pengajuan/:id", getEditPengajuan)
module.exports = router;
