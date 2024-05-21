import { Router } from "express";
import productManager from "../productManager.js";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";

const router = Router();


router.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts(limit);

        res.status(200).json({ status: "Success", products});

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", mensaje: "Error del servidor..."});
    }
})

router.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(Number(pid));

        if(!product) return res.status(404).json({status: "Error", mensaje: "Producto ingresado no encontrado"});

        res.status(200).json({ status: "Success", product});

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", mensaje: "Error del servidor..."});
    }
})


router.post("/", checkProductData, async (req, res) => {
    try {
        const body = req.body;
        const products = await productManager.addProduct(body);

        res.status(201).json({ status: "Success", products }); //status 201: se ha creado un producto

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", mensaje: "Error del servidor..."});
    }
})

router.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const body = req.body;
        const product = await productManager.updateProduct(Number(pid), body);

        if(!product) return res.status(404).json({status: "Error", mensaje: "Producto ingresado no encontrado"});

        res.status(200).json({ status: "Success", product});

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", mensaje: "Error del servidor..."});
    }
})


router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.deleteProduct(Number(pid));

        if(!product) return res.status(404).json({status: "Error", mensaje: "Producto ingresado no encontrado"});

        res.status(200).json({ status: "Success", mensaje: "Producto eliminado exitosamente"});

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", mensaje: "Error del servidor..."});
    }
})

export default router;