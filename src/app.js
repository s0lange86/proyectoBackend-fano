import express from "express";
import router from "./router/index.routes.js"

const PORT = 8080;
const app = express();

//Middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas:
app.use("/api", router)


app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})