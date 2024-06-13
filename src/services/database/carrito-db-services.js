import CarritoDeCompras from "../../models/carritoDeCompras.js";

export async function getCarritoDeCompras() {
  const carrito = await CarritoDeCompras.find();
  return carrito;
}

export async function createCarritoDeCompras(carrito) {
  const carritoDoc = new CarritoDeCompras(carrito);
  const createdCarrito = await carritoDoc.save();
  return createdCarrito;
}

export async function getCarritoDeComprasById(id) {
  const carrito = await CarritoDeCompras.findById(id);
  return carrito;
}

export async function deleteCarritoDeComprasById(id) {
  const carrito = await CarritoDeCompras.findByIdAndDelete(id);
  return carrito;
}

export async function updateCarritoDeComprasById(id, update) {
  const carrito = await CarritoDeCompras.findByIdAndUpdate(id, update);
  return carrito;
}

export async function getCarritoDeComprasByUser(user) {
  const carrito = await CarritoDeCompras.find({ user });
  return carrito;
}

export async function updateCarritoDeComprasByUser(user, update) {
  const carrito = await CarritoDeCompras.findOneAndUpdate ({ user }, update);
  return carrito;
}

