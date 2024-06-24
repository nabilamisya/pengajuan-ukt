const express = require('express');
const router = express.Router();
const {User} = require('../models');



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
module.exports = router;
