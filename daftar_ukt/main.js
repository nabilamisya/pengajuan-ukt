const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, quantity } = req.body;
    const item = new Item({ name, quantity });
    try {
        const savedItem = await item.save();
        res.json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updatedItem == null) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (deletedItem == null) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;