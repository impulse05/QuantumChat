import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./Config/db.js";
import userRoutes from "./routes/userAuth.js"
import chatRoutes from "./routes/chatRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import passport from "passport";
import path from "path"
// server swagger ui
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' assert { type: "json" };

dotenv.config();

connectDB();


const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(passport.initialize())
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("<h1>Server is running</h1>");
});

app.use("/api", userRoutes);
app.use("/api", chatRoutes);
app.use("/api", messageRoutes);






// add 3 button in the ui for google, github and facebook
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/home", (req, res) => {
  res.sendFile('index.html',{root:'.'});
});




const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`The port is ${PORT}`);
});
