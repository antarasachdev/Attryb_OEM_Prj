import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import authRouter from "../backend/routers/authRouter.js"
import CarRoutes from "./routers/CarRouter.js"
import {connectDB}  from "../backend/lib/db.js"
import cors from "cors";

dotenv.config()
const port = process.env.PORT || 5000
const app = express()

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
connectDB();
app.use("/api/auth",authRouter)

app.use('/api/cars', CarRoutes);

app.listen(port,()=>{
    console.log("server is running on port "+port);
})
