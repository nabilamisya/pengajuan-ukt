 const express = require('express');
const { GetDashboard, GetFileSurat, GetRiwayatPengajuan } = require('../controllers/Mahasiswa');
const router = express.Router();

router.get('/dashboard', GetDashboard);
router.get('/pengajuan/surat', GetFileSurat);
router.get('/pengajuan/riwayat', GetRiwayatPengajuan);

module.exports = router;
