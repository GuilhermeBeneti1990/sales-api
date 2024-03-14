import productsRouter from "@modules/products/routes/products.routes";
import { Router } from "express";

const routes = Router();

routes.use('/products', productsRouter);

routes.get('/health', (req, res) => {
  res.json({
    message: 'API UP'
  });
})

export default routes;
