import {getCarritoDeCompras, getCarritoDeComprasByUser , getCarritoDeComprasById , deleteCarritoDeComprasById , updateCarritoDeComprasById , updateCarritoDeComprasByUser , createCarritoDeCompras} from '../services/database/carrito-db-services.js'


export async function createCarritoDeComprasController(req, res, next) {
  const { user, products } = req.body;
  if (!user || !products) {
    return res.status(400).json({ message: 'User and products are required' });
  }
  try {
    const foundUser = await getCarritoDeComprasByUser(user);
    if (foundUser) {
      return res.status(409).json({ message: 'Carrito de compras already exists for this user' });
    }
    const carritoData = {
      user,
      products
    };
    const createdCarrito = await createCarritoDeCompras(carritoData);
    res.status(201).json(createdCarrito);
  } catch (error) {
    next(error);
  }
}



