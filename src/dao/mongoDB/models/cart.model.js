import mongoose from "mongoose";

//nombre de la coleccion: "carts":
const cartCollection = "carts"; // en plural porque es una coleccion de "cartS"

//creamos el "schema", la estructura de como van a ser los datos y el tipo de dato:
const cartSchema = new mongoose.Schema({
    products: {
        type: Array,
        default: [],
    }
})

//creamos el modelo: coleccion + schema
export const cartModel = mongoose.model(cartCollection, cartSchema)