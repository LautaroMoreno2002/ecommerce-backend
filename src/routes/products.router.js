const express = require('express');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/', postProduct);
router.delete('/:id', removeProduct);

module.exports = router;