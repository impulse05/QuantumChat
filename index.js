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
import socketInit from "./socket.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

connectDB();


const app = express();
app.use(cors());
app.use(passport.initialize())
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));



app.use("/api", userRoutes);
app.use("/api", chatRoutes);
app.use("/api", messageRoutes);






// add 3 button in the ui for google, github and facebook
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV !== "development") {
  app.use(express.static("client/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}




const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`The port is ${PORT}`);
});


socketInit(server);