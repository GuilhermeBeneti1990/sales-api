import { Router } from "express";
import ProductController from "../controllers/ProductController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const productsRouter = Router();

const controller = new ProductController();

productsRouter.use(isAuthenticated);

productsRouter.get('/', controller.list);

productsRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}), controller.show);

productsRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().required()
  }
}), controller.create);

productsRouter.put('/:id',  celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  },
  [Segments.BODY]: {
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number().precision(2),
    quantity: Joi.number()
  }
}),  controller.update);

productsRouter.delete('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}),  controller.delete);

export default productsRouter;
