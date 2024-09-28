import { dynamoDB } from '../../src/config/database.config';
import { ProductI } from '../../src/models/product.interface';
import { ProductRepository } from '../../src/repositories/product.repository';

// Mock  DynamoDB
jest.mock('../../src/config/database.config', () => ({
  dynamoDB: {
    put: jest.fn(),
    scan: jest.fn(),
  },
}));

describe('ProductRepository', () => {
  let productRepository: ProductRepository;

  beforeEach(() => {
    productRepository = new ProductRepository();
    jest.clearAllMocks();
  });

  describe('saveProduct', () => {
    it('should save a product to DynamoDB', async () => {
      const mockProduct: ProductI = {
        id: 'fd7d26a4-8982-48c3-acf8-1910b02496ab',
        title: 'Test Product',
        price: 9.99,
        size: 'M',
        stock: 100,
      };

      (dynamoDB.put as jest.Mock).mockReturnValue({
        promise: jest.fn().mockResolvedValue({}),
      });

      const result = await productRepository.saveProduct(mockProduct);

      expect(dynamoDB.put).toHaveBeenCalledWith({
        TableName: 'productsTable',
        Item: mockProduct,
      });
      expect(result).toEqual(mockProduct);
    });

    it('should throw an error if DynamoDB put operation fails', async () => {
      const mockProduct: ProductI = {
        id: 'fd7d26a4-8982-48c3-acf8-1910b02496ab',
        title: 'Test Product',
        price: 9.99,
        size: 'M',
        stock: 100,
      };

      (dynamoDB.put as jest.Mock).mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error('DynamoDB error')),
      });

      await expect(productRepository.saveProduct(mockProduct)).rejects.toThrow('DynamoDB error');
    });
  });

  describe('getAllProducts', () => {
    it('should return all products from DynamoDB', async () => {
      const mockProducts: ProductI[] = [
        {
          id: 'fd7d26a4-8982-48c3-acf8-1910b02496ab',
          title: 'Test Product',
          price: 9.99,
          size: 'M',
          stock: 100,
        },
      ];

      (dynamoDB.scan as jest.Mock).mockReturnValue({
        promise: jest.fn().mockResolvedValue({ Items: mockProducts }),
      });

      const result = await productRepository.getAllProducts();

      expect(dynamoDB.scan).toHaveBeenCalledWith({
        TableName: 'productsTable',
      });
      expect(result).toEqual(mockProducts);
    });

    it('should return an empty array if no products are found', async () => {
      (dynamoDB.scan as jest.Mock).mockReturnValue({
        promise: jest.fn().mockResolvedValue({ Items: undefined }),
      });

      const result = await productRepository.getAllProducts();

      expect(dynamoDB.scan).toHaveBeenCalledWith({
        TableName: 'productsTable',
      });
      expect(result).toEqual([]);
    });

    it('should throw an error if DynamoDB scan operation fails', async () => {
      (dynamoDB.scan as jest.Mock).mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error('DynamoDB error')),
      });

      await expect(productRepository.getAllProducts()).rejects.toThrow('DynamoDB error');
    });
  });
});
