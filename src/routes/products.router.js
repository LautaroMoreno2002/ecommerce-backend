const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

router.get('/', (req, res) => {
  try {
    res.status(200).json(await Product.find());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getProduct);

router.post('/', (req, res) => {
  const { brand,
  model,
  release_year,
  price,
  os,
  dimensions,
  weight,
  specifications,
  processor,
  ram,
  internal_storage,
  expandable_storage,
  camera,
  battery,
  connectivity,
  colors } = req.body;

  if (!brand || !model || !release_year || !price || !os || !dimensions || !weight || !specifications || !processor || !ram || !internal_storage || !expandable_storage || !camera || !battery || !connectivity || !colors) {
    return res.status(400).json({ message: 'Los campos deben estar completos' });
  }
  const newProduct = new Product({
    brand,
    model,
    release_year,
    price,
    os,
    dimensions,
    weight,
    specifications,
    processor,
    ram,
    internal_storage,
    expandable_storage,
    camera,
    battery,
    connectivity,
    colors
  });
  
  try {
    newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    
  }
});

router.delete('/:id', removeProduct);¿

module.exports = router;