import { findById } from "../models/product.model";

const getProduct = async (req, res, next) => {
  let product;
  const { id } = req.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'El id no es válido.' });
  }
  try {
    product = await findById(id);
    if (!id) 
      return res.status(404).json({ message: 'Producto no encontrado.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.product = product;
  next();
}

export default getProduct;