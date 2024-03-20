import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { errors } from "celebrate";
import routes from "./routes";
import AppError from "@shared/errors/AppError";
import "@shared/typeorm";
import uploadConfig from "@config/upload";
import { pagination } from "typeorm-pagination";

const app = express();

app.use(cors());
app.use(express.json());
app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);
app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message
    });
  }
  
  return res.status(500).json({
    message: 'Internal server error'
  });
})

app.listen(process.env.APP_PORT, () => {
  console.log(':::Server started on port 3333::: 🏆');
})
