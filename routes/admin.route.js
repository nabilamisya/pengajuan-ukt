const express = require('express');
const router = express.Router();
const {User, Pengajuan} = require('../models');
const { putPengajuan, putPengajuanStatus } = require('../controller/pengajuan.controller');



router.get("/dashboard", async (req, res) => {
    try {

        const items = await User.findAll({
            where:{role:"mahasiswa"}
        });
        res.render('admin/dashboard', {
            title: 'Dashboard', items
           
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});
      

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

router.post("/pengajuan/status", putPengajuanStatus)
module.exports = router;
