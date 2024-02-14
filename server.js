import express from 'express'
import cors from 'cors';
import { dbConnection } from './config/dbConnection.js';
import cookieParser from 'cookie-parser';



//routes import
import productRoute from './routes/productRoutes.js'
import userRoute from './routes/userRoutes.js'
import importRoute from './routes/importData.js'



const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(cookieParser());


//mongoDb connection
dbConnection();

//Routes

app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api", importRoute);






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})