const express = require('express');
const router = express.Router();
const {User} = require('../models');
const {Pengajuan} = require('../models');



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
router.get("/berkas", async (req, res) => {
    try {

        const pengajuans = await Pengajuan.findAll({
            include: [
                {
                    model: User,
                    as: 'mahasiswa',
                    where: { role: 'mahasiswa' }
                }
            ]
        });
        res.render('admin/berkas', {
            title: 'Dashboard', pengajuans
           
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.get("/berita", async (req, res) => {
    try {
        res.render('admin/beritaAcara', {
            title: 'Dashboard'
           
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;
