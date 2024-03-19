import { Router } from "express";
import OrderController from "../controllers/OrderController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const ordersRouter = Router();

const controller = new OrderController();

ordersRouter.use(isAuthenticated);

ordersRouter.post('/', celebrate({
  [Segments.BODY]: {
    customer_id: Joi.string().uuid().required(),
    products: Joi.required()
  }
}), controller.create);

ordersRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}), controller.show);

export default ordersRouter;
