import express from "express";
import cors from "cors";
import orderRouter from "./routers/order-router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/orders", orderRouter);

app.listen(8080, () => console.log("server listening on port 8080"));
