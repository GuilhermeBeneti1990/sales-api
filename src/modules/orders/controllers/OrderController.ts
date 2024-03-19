import { Request, Response } from "express";
import CreateOrderService from "../services/CreateOrderService";
import ShowOrderService from "../services/ShowOrderService";

export default class OrderController {

  public async create(req: Request, res: Response): Promise<Response> {
    const createOrderService = new CreateOrderService();
    const { customer_id, products } = req.body;

    const order = await createOrderService.execute({customer_id, products});

    return res.json({
      status: 200,
      body: order
    });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showOrderService = new ShowOrderService();

    const order = await showOrderService.execute({ id });

    return res.json({
      status: 200,
      body: order
    });
  }

}
