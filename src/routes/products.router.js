const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await Product.find());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', );

// router.post('/', (req, res) => {
//   console.log(req.body);
  
//   const { brand, model, release_year, price, osname, osversion, dimensions, weight, specifications, connectivity, colors } = req?.body;

//   if (!brand || !model || !release_year || !price || !osname || !osversion || !dimensions || !weight || !specifications || !connectivity || !colors) {
//     return res.status(400).json({ message: 'Los campos deben estar completos.' });
//   }
//   const newProduct = new Product({
//     brand,
//     model,
//     release_year,
//     price,
//     osname,
//     osversion,
//     dimensions,
//     weight,
//     specifications,
//     connectivity,
//     colors
//   });
//   try {
//     newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Para cargar multiples productos

// router.post('/', (req, res) => {
//   const { products } = req.body;
//   try {
//     for (product of products) {
//       console.log(product);
      
//       const { brand, model, release_year, price, osname, osversion, dimensions, weight, specifications, connectivity, colors } = product;
//       if (!brand || !model || !release_year || !price || !osname || !osversion || !dimensions || !weight || !specifications || !connectivity || !colors) {
//         return res.status(400).json({ message: 'Los campos deben estar completos en cada producto.' });
//       }
//       const newProduct = new Product({
//       brand,
//       model,
//       release_year,
//       price,
//       osname,
//       osversion,
//       dimensions,
//       weight,
//       specifications,
//       connectivity,
//       colors
//     });
//     newProduct.save();  
//   }
//   res.status(201).json(products);
//  } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
//   }
// )

const appendProduct = (product, res) => {
  const { brand, model, release_year, price, osname, osversion, dimensions, weight, specifications, connectivity, colors } = product;

  if (!brand || !model || !release_year || !price || !osname || !osversion || !dimensions || !weight || !specifications || !connectivity || !colors) {
    return res.status(400).json({ message: 'Los campos deben estar completos.' });
  }
  const newProduct = new Product({
    brand, model, release_year, price, osname, osversion, dimensions, weight, specifications, connectivity, colors
  });
  newProduct.save();
}

router.post('/', (req, res) => {
  const { products } = req.body;
  if (!products) {
    appendProduct(req.body, res);
    res.status(201).json(req.body);
  } else {
    try {
      products.forEach(product => {
        appendProduct(product, res);
      });
    res.status(201).json(products);
 } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
}
)

router.delete('/:id', );

module.exports = router;