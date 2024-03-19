import { Request, Response } from "express";
import ListCustomersService from "../services/ListCustomersService";
import ShowCustomerService from "../services/ShowCustomerService";
import CreateCustomerService from "../services/CreateCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";

export default class CustomerController {

  public async list(req: Request, res: Response): Promise<Response> {
    const listCostumerService = new ListCustomersService();

    const costumers = await listCostumerService.execute();

    return res.json({
      status: 200,
      body: costumers
    });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showCustomerService = new ShowCustomerService();

    const customer = await showCustomerService.execute({ id });

    return res.json({
      status: 200,
      body: customer
    });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const createCustomerService = new CreateCustomerService();

    const customer = await createCustomerService.execute({
      name,
      email
    });

    return res.json({
      status: 201,
      body: customer
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email } = req.body;

    const updateCustomerService = new UpdateCustomerService();

    const customer = await updateCustomerService.execute({
      id,
      name,
      email
    });

    return res.json({
      status: 200,
      body: customer
    });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCustomerService = new DeleteCustomerService();

    await deleteCustomerService.execute({ id });

    return res.json({
      status: 200,
      body: {
        message: `Customer ID ${id} deleted with successfully!`
      }
    });
  }

}
