import { Router } from "express";
import CustomerController from "../controllers/CustomerController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const customersRouter = Router();

const controller = new CustomerController();

customersRouter.use(isAuthenticated);

customersRouter.get('/', controller.list);

customersRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}), controller.show);

customersRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required()
  }
}), controller.create);

customersRouter.put('/:id',  celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  },
  [Segments.BODY]: {
    name: Joi.string(),
    email: Joi.string().email().required()
  }
}),  controller.update);

customersRouter.delete('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}),  controller.delete);

export default customersRouter;
