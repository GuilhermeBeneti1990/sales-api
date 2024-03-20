import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache";

interface IRequest {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  
  public async execute({id, name, description, price, quantity}: IRequest): Promise<Product> {
    const repository = getCustomRepository(ProductRepository);
    
    const product = await repository.findOne(id);

    if(!product) throw new AppError('Product not found!', 404);

    const productNameExists = await repository.findByName(name);

    if(productNameExists && name !== product.name) throw new AppError('There is already a product with this name!');

    const redisCache = new RedisCache();

    await redisCache.invalidate('[salesAPI]-PRODUCT_LIST');

    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;

    await repository.save(product);

    return product;
  }

}

export default UpdateProductService;
