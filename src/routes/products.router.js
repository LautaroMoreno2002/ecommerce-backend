import { Router } from 'express';
const router = Router();
import Product, { find, deleteMany } from '../models/product.model';
import getProduct from '../middlewares/getProduct';

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

// Retorna todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await find();
    if (products.length === 0) 
      res.status(201).json({ message: 'No hay productos cargados', products });
    else 
      res.status(200).json({ message: `Cantidad de productos: ${products.length}.`, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

router.post('/', (req, res) => {
  const { products } = req.body;
  if (!products) {
    appendProduct(req.body, res);
    res.status(201).json({ message: 'Producto creado correctamente.', product: req.body });
  } else {
    try {
      products.forEach(product => {
        appendProduct(product, res);
      });
    res.status(201).json({ message: 'Productos creados correctamente.', products });
 } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
});


// Elimina todo de forma global
router.delete('/', async (req, res) => {
  try {
    await deleteMany({});
    res.json({ message: 'Productos eliminados correctamente.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Retorna un producto
router.get('/:id', getProduct, async (req, res) => {
  res.json(res.product);
});

// Elimina un producto
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.deleteOne({
      _id: res.product._id
    })
    res.json({ message: 'Producto eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualiza un producto por completo
router.put('/:id', getProduct, async (req, res) => {
  const { brand, model, release_year, price, osname, osversion, dimensions, weight, specifications, connectivity, colors } = req.body;
  if (!brand || !model || !release_year || !price || !osname || !osversion || !dimensions || !weight || !specifications || !connectivity || !colors) {
    return res.status(400).json({ message: 'Debe enviar todos los campos para actualizar.' });
  }
  res.product.brand = brand || res.product.brand;
  res.product.model = model || res.product.model;
  res.product.release_year = release_year || res.product.release_year;
  res.product.price = price || res.product.price;
  res.product.osname = osname || res.product.osname;
  res.product.osversion = osversion || res.product.osversion;
  res.product.dimensions = dimensions || res.product.dimensions;
  res.product.weight = weight || res.product.weight;
  res.product.specifications = specifications || res.product.specifications;
  res.product.connectivity = connectivity || res.product.connectivity;
  res.product.colors = colors || res.product.colors;
  try {
    await res.product.save();
    res.json({ message: 'Producto actualizado completamente.', product: res.product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualiza una parte de un producto
router.patch('/:id', getProduct, async (req, res) => {
  const { brand, model, release_year, price, osname, osversion, dimensions, weight, specifications, connectivity, colors } = req.body;
  if (!brand && !model && !release_year && !price && !osname && !osversion && !dimensions && !weight && !specifications && !connectivity && !colors) {
    return res.status(400).json({ message: 'Debe enviar al menos un campo para actualizar.' });
  }
  res.product.brand = brand || res.product.brand;
  res.product.model = model || res.product.model; 
  res.product.release_year = release_year || res.product.release_year;
  res.product.price = price || res.product.price;
  res.product.osname = osname || res.product.osname;
  res.product.osversion = osversion || res.product.osversion;
  res.product.dimensions = dimensions || res.product.dimensions;
  res.product.weight = weight || res.product.weight;
  res.product.specifications = specifications || res.product.specifications;
  res.product.connectivity = connectivity || res.product.connectivity;
  res.product.colors = colors || res.product.colors;
  try {
    await res.product.save();
    res.json({ message: 'Producto actualizado parcialmente.', product: res.product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
export default router;