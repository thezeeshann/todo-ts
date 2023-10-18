import express, { Express } from "express";
import connectDB from "./src/db";
import router from "./src/routes/route";
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
  credentials:true,
  origin:"http://localhost:5173",
}))
connectDB();
app.use('/api/v1',router)


app.listen(port, () => {
  console.log(`server is running http://localhost:${port}`);
});
