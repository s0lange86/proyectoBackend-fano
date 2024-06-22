import { Router } from "express";
import cartDao from "../dao/mongoDB/cart.dao.js";
import productDao from "../dao/mongoDB/product.dao.js";

const router = Router();

router.post("/", async(req, res) => {
    try {
        const cart = await cartDao.createItem()
        res.status(201).json({ status: "Success", cart }); //status 201: se ha creado un carrito

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", mensaje: "Error del servidor..." });
    }
})

router.get("/:cid", async(req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartDao.getById(cid);

        if(!cart) return res.status(404).json({status: "Error", mensaje: "Carrito ingresado no encontrado"});

        res.status(200).json({ status: "Success", cart});

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", mensaje: "Error del servidor..." });
    }
})

router.post("/:cid/product/:pid", async(req, res) => {
    try {
        const { cid, pid } = req.params;

        const product = await productDao.getById(pid);
        if(!product) return res.status(404).json({ status: "Error", mensaje: "Producto ingresado no encontrado" });

        const cart = await cartDao.addProductToCart(cid, product)
        if(!cart) return res.status(404).json({ status: "Error", mensaje: "Carrito ingresado no encontrado" });

        res.status(201).json({ status: "Success", cart});

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", mensaje: "Error del servidor..." });
    }
})



export default router;