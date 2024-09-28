import { v4 as uuid } from 'uuid';
import { dataMapear, mapObject } from '../mappers/data.mapper';
import { mapProduct } from '../mappers/map/map-product';
import { ProductI } from '../models/product.interface';
import { ProductRepository } from '../repositories/product.repository';
import { ProductRequestType, ProductType } from '../types/services/product/product-request';

const productRepository = new ProductRepository();

export class ProductService {
  async createProduct(data: ProductRequestType) {
    const { title, price, size, stock } = data;

    const newProduct: ProductI = {
      id: uuid(),
      price,
      size,
      stock,
      title,
    };

    const product = await productRepository.saveProduct(newProduct);

    const productMapped = mapObject<ProductI, ProductType>(product, mapProduct);
    return productMapped;
  }

  async getAllProducts() {
    const products = await productRepository.getAllProducts();

    const mappedProducts = dataMapear<ProductI, ProductType>(products as any, mapProduct);

    return mappedProducts;
  }
}
