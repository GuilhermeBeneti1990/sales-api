import productsRouter from "@modules/products/routes/products.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import usersRouter from "@modules/users/routes/users.routes";
import { Router } from "express";

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

routes.get('/health', (req, res) => {
  res.json({
    message: 'API UP'
  });
})

export default routes;
