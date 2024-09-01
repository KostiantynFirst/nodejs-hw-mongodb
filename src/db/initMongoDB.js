import mongoose from "mongoose";
import { env } from "../utils/env.js";

export const initMobgoDB = async () => {
    try {
        const user = env("MONGODB_USER");
        const password = env("MONGODB_PASSWORD");
        const url = env("MONGODB_URL");
        const db_name = env("MONGODB_DB");


        const DB_HOST = `mongodb+srv://${user}:${password}@${url}/${db_name}?retryWrites=true&w=majority&appName=Cluster0`;
        await mongoose.connect(DB_HOST);
        console.log("Mongo connection successfully established!")
    } catch (error) {
        console.log("Mongodb connection error", error.message);
        throw error;
    }
}