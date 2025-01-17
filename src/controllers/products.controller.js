const Product = require('');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log('GET ALL', products);
    if (products === 0) 
      { return res.status(204).send('No hay productos cargados.') }
    res.status(200).send(products);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const postProduct = async (req, res) => {
  const { name } = req.body;
  if (!name) { return res.status(400).json({ message: 'Los campos deben estar completos.' }) }
  try {
    const product = new Product(name);
    const newProduct = await product.save();
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}