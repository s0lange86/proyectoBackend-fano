import { Router } from "express";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import productDao from "../dao/mongoDB/product.dao.js";

const router = Router();


router.get("/", async (req, res) => {
    try {
        // const { limit } = req.query;
        const products = await productDao.getAll();

        res.status(200).json({ status: "Success", products});

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", mensaje: "Error del servidor..." });
    }
})

router.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productDao.getById(pid)

        if(!product) return res.status(404).json({ status: "Error", mensaje: "Producto ingresado no encontrado" });

        res.status(200).json({ status: "Success", product});

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", mensaje: "Error del servidor..." });
    }
})


router.post("/", checkProductData, async (req, res) => {
    try {
        const productData = req.body;
        const product = await productDao.createItem(productData);

        res.status(201).json({ status: "Success", product }); //status 201: se ha creado un producto

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", mensaje: "Error del servidor..." });
    }
})

router.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const productData = req.body;
        const product = await productDao.updateItem(pid, productData)

        if(!product) return res.status(404).json({status: "Error", mensaje: "Producto ingresado no encontrado"});

        res.status(200).json({ status: "Success", product});

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", mensaje: "Error del servidor..." });
    }
})


router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productDao.deleteItem(pid)

        if(!product) return res.status(404).json({status: "Error", mensaje: "Producto ingresado no encontrado"});

        res.status(200).json({ status: "Success", mensaje: "Producto eliminado exitosamente"});

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", mensaje: "Error del servidor..." });
    }
})

export default router;