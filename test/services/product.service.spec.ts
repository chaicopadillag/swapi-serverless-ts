import { v4 as uuid } from 'uuid';
import { dataMapear, mapObject } from '../../src/mappers/data.mapper';
import { ProductI } from '../../src/models/product.interface';
import { ProductRepository } from '../../src/repositories/product.repository';
import { ProductService } from '../../src/services/product.service';
import { ProductRequestType, ProductType } from '../../src/types/services/product/product-request';

// Mock  DynamoDB
jest.mock('../../src/config/database.config', () => ({
  dynamoDB: {
    put: jest.fn(),
    scan: jest.fn(),
  },
}));

jest.mock('uuid');
jest.mock('../../src/repositories/product.repository');
jest.mock('../../src/mappers/data.mapper');
jest.mock('../../src/mappers/map/map-product');

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    productRepository = new ProductRepository() as jest.Mocked<ProductRepository>;
    productService = new ProductService();

    jest.clearAllMocks();
  });

  describe('createProduct', () => {
    it('should create a new product and return the mapped product', async () => {
      const mockUuid = '1234-5678';
      (uuid as jest.Mock).mockReturnValue(mockUuid);

      const mockData: ProductRequestType = {
        title: 'Product 1',
        price: 100,
        size: 'M',
        stock: 50,
      };

      const mockProduct: ProductI = {
        id: mockUuid,
        ...mockData,
      };

      const mockMappedProduct = {
        id: mockUuid,
        precio: mockData.price,
        existencias: mockData.stock,
        talla: mockData.size,
        titulo: mockData.title,
      } as ProductType;

      productRepository.saveProduct.mockResolvedValueOnce(mockProduct);
      (mapObject as jest.Mock).mockReturnValue(mockMappedProduct);

      const result = await productService.createProduct(mockData);

      expect(uuid).toHaveBeenCalled();
      expect(result).toEqual(mockMappedProduct);
    });
  });

  describe('getAllProducts', () => {
    it('should return all products mapped', async () => {
      const mockProducts: ProductI[] = [
        { id: '1', title: 'Product 1', price: 100, size: 'M', stock: 50 },
        { id: '2', title: 'Product 2', price: 200, size: 'L', stock: 30 },
      ];

      const mockMappedProducts: ProductType[] = [
        { id: '1', titulo: 'Product 1', precio: 100, talla: 'M', existencias: 50 },
        { id: '2', titulo: 'Product 2', precio: 200, talla: 'L', existencias: 30 },
      ];

      productRepository.getAllProducts.mockResolvedValueOnce(mockProducts);
      (dataMapear as jest.Mock).mockReturnValue(mockMappedProducts);

      const result = await productService.getAllProducts();
      expect(result).toEqual(mockMappedProducts);
    });
  });
});
