import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import Product from "../typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache";

class ListProductsService {
  
  public async execute(): Promise<Product[]> {
    const repository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>('[salesAPI]-PRODUCT_LIST');
    
    if(!products) {
      products = await repository.find();

      await redisCache.save('[salesAPI]-PRODUCT_LIST', products);
    }

    return products;
  }

}

export default ListProductsService;
