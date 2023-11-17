import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './db/dbconnect.js'




dotenv.config();

const port = process.env.PORT || 5050;

const app = express();
app.use(express.json());

app.use(cors());


// connect to the DB
connectDB();


// chack if the DB is connect.
mongoose.connection.once("open", () => {
  console.log("connect to the DB");
});

app.listen(port, () => {
  console.log("the server is listening in port " + port);
});
