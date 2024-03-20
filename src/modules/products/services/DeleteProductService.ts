import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";

interface IRequest {
  id: string
}


class DeleteProductService {
  
  public async execute({ id }: IRequest): Promise<void> {
    const repository = getCustomRepository(ProductRepository);
    
    const product = await repository.findOne(id);

    if(!product) throw new AppError('Product not found!', 404);

    const redisCache = new RedisCache();

    await redisCache.invalidate('[salesAPI]-PRODUCT_LIST');

    await repository.remove(product);
  }

}

export default DeleteProductService;
