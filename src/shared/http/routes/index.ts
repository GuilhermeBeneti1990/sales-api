import productsRouter from "@modules/products/routes/products.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import usersRouter from "@modules/users/routes/users.routes";
import { Router } from "express";
import profileRouter from "@modules/users/routes/profile.routes";
import customersRouter from "@modules/customers/routes/customers.routes";
import ordersRouter from "@modules/orders/routes/orders.routes";

const routes = Router();

routes.get('/health', (req, res) => {
  res.json({
    message: 'API UP'
  });
});

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
