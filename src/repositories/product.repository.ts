import { ProductI } from 'models/product.interface';
import { dynamoDB } from '../config/database.config';

const productsTable = 'productsTable';

export class ProductRepository {
  async saveProduct(product: ProductI) {
    const params = {
      TableName: productsTable,
      Item: product,
    };
    await dynamoDB.put(params).promise();

    return product;
  }

  async getAllProducts() {
    const params = {
      TableName: productsTable,
    };
    const result = await dynamoDB.scan(params).promise();
    return result?.Items ?? [];
  }
}
