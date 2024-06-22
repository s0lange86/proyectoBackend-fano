import mongoose from "mongoose";

//funcion para determinar la conexion de mongo atlas:
export const connectMongoDB = async () => {
    try {
        mongoose.connect("");
        console.log("MongoDB connected");
    } catch (error) {
        console.log(`Error: ${error}}`);
    }
}
