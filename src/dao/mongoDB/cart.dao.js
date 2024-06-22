// vamos a crear el CRUD completo con MONGOOSE que interactua con nuestra BD utilizando el/los modelos creados ("models")

import { cartModel } from "./models/cart.model.js";

// traemos todos los carritos de la BD
const getAll = async () => {
const carts = await cartModel.find();
    return carts;
}

// buscamos un carrito en la BD por ID
const getById = async (id) => {
    const cart = await cartModel.findById(id);
    return cart;
}

// creamos un carrito nuevo
const createItem = async (data) => {
    const cart = await cartModel.create(data);
    return cart;
}

// actualizamos datos de un carrito de la BD
const updateItem = async (id, data) => {
    const cartUpdate = await cartModel.findByIdAndUpdate(id, data, {new: true}); //el 3er parámetro hace que el return devuelva el carrito con el dato actualizado
    return cartUpdate;
}

// deshabilitamos un carrito de la BD
const deleteItem = async (id) => {
    const cart = await cartModel.deleteOne({_id: id}); // en este caso sí eliminamos el carrito "físicamente"
    return cart;
}

// agregamos un producto especifico en un carrito especifo de la BD
const addProductToCart = async (id, productData) => {
    const cart = await cartModel.findByIdAndUpdate(id, { $push: {products: productData} }, {new:true});
    return cart;
}


// exportamos todas las funciones para utilizarlas en los routes:
export default {
    getAll,
    getById,
    createItem,
    updateItem,
    deleteItem,
    addProductToCart
}