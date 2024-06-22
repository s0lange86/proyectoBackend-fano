import mongoose from "mongoose";

//funcion para determinar la conexion de mongo atlas:
export const connectMongoDB = async () => {
    try {
        mongoose.connect("mongodb+srv://admin:123@coder.zu2v8jq.mongodb.net/proyectoBackend");
        console.log("MongoDB connected");
    } catch (error) {
        console.log(`Error: ${error}}`);
    }
}