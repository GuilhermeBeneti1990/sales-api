import { getCustomRepository } from "typeorm";
import { OrderRepository } from "../typeorm/repositories/OrderRepository";
import AppError from "@shared/errors/AppError";
import Order from "../typeorm/entities/Order";
import { CustomerRepository } from "@modules/customers/typeorm/repositories/CustomerRepository";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductRepository";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  
  public async execute({customer_id, products}: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);
    const customerRepository = getCustomRepository(CustomerRepository);
    const productRepository = getCustomRepository(ProductRepository);
    
    const customerExists = await customerRepository.findById(customer_id);

    if(!customerExists) throw new AppError('Customer not found!', 404);

    const productsExists = await productRepository.findAllByIds(products);

    if(!productsExists.length) throw new AppError('Products Ids not found!', 404); 

    const productsExistsIds = productsExists.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !productsExistsIds.includes(product.id)
    );

    if(checkInexistentProducts.length) throw new AppError(`Product ${checkInexistentProducts[0].id} not found`, 404);

    const quantityAvailable = products.filter(product => productsExists.filter(p => p.id === product.id)[0].quantity < product.quantity);

    if(quantityAvailable.length) throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for the product: ${quantityAvailable[0].id}`);

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsExists.filter(p => p.id === product.id)[0].price
    }));

    const order = await orderRepository.createOrder({
      customer: customerExists,
      products: serializedProducts
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity: productsExists.filter(p => p.id === product.product_id)[0].quantity - product.quantity
    }));

    await productRepository.save(updatedProductQuantity);

    return order;
  }

}

export default CreateOrderService;
