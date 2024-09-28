import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpStatusCode } from 'axios';
import { createProduct, getAllProducts } from '../../src/controllers/productController';
import { ProductService } from '../../src/services/product.service';
import { errorResponse, successResponse } from '../../src/shared/utils/http-response';
import { ProductRequestType } from '../../src/types/services/product/product-request';

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

jest.mock('../../src/services/product.service');
const mockProductService = ProductService as jest.MockedClass<typeof ProductService>;

jest.mock('../../src/shared/utils/http-response');
const mockSuccessResponse = successResponse as jest.Mock;
const mockErrorResponse = errorResponse as jest.Mock;

describe('createProduct Lambda function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a success response when product is created successfully', async () => {
    const mockUuid = '1234-5678';
    const mockData: ProductRequestType = {
      title: 'Product 1',
      price: 100,
      size: 'M',
      stock: 50,
    };
    const mockEvent = {
      body: JSON.stringify(mockData),
    } as APIGatewayProxyEvent;

    const mockProduct = {
      id: mockUuid,
      precio: mockData.price,
      existencias: mockData.stock,
      talla: mockData.size,
      titulo: mockData.title,
    };
    mockProductService.prototype.createProduct.mockResolvedValue(mockProduct);

    mockSuccessResponse.mockReturnValue({
      statusCode: 200,
      body: JSON.stringify(mockProduct),
    });

    const result = await createProduct(mockEvent);

    expect(mockProductService.prototype.createProduct).toHaveBeenCalledWith(mockData);

    expect(mockSuccessResponse).toHaveBeenCalledWith(mockProduct);
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify(mockProduct));
  });

  it('should return an error response when body is missing', async () => {
    const mockEvent = {} as APIGatewayProxyEvent;

    mockErrorResponse.mockReturnValue({
      statusCode: HttpStatusCode.UnprocessableEntity,
      body: JSON.stringify({ message: 'Los datos enviados no son válidos' }),
    });

    const result = await createProduct(mockEvent);

    expect(mockProductService.prototype.createProduct).not.toHaveBeenCalled();
    expect(mockErrorResponse).toHaveBeenCalledWith(
      'Los datos enviados no son válidos',
      HttpStatusCode.UnprocessableEntity
    );
    expect(result.statusCode).toBe(HttpStatusCode.UnprocessableEntity);
    expect(result.body).toBe(JSON.stringify({ message: 'Los datos enviados no son válidos' }));
  });

  it('should return an error response when product creation fails', async () => {
    const mockEvent = {
      body: JSON.stringify({ name: 'Test Product', price: 100 }),
    } as APIGatewayProxyEvent;

    const mockError = new Error('Service error');
    mockProductService.prototype.createProduct.mockRejectedValue(mockError);

    mockErrorResponse.mockReturnValue({
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch save product' }),
    });

    const result = await createProduct(mockEvent);

    expect(mockProductService.prototype.createProduct).toHaveBeenCalledTimes(1);
    expect(mockErrorResponse).toHaveBeenCalledWith('Failed to fetch save product');
    expect(result.statusCode).toBe(500);
    expect(result.body).toBe(JSON.stringify({ message: 'Failed to fetch save product' }));
  });
});

describe('getAllProducts Lambda function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a success response with all products', async () => {
    const mockProducts = [
      { id: '1', titulo: 'Product 1', precio: 100, talla: 'M', existencias: 50 },
      { id: '2', titulo: 'Product 2', precio: 200, talla: 'L', existencias: 30 },
    ];
    mockProductService.prototype.getAllProducts.mockResolvedValue(mockProducts);

    mockSuccessResponse.mockReturnValue({
      statusCode: 200,
      body: JSON.stringify(mockProducts),
    });

    const result = await getAllProducts();

    expect(mockProductService.prototype.getAllProducts).toHaveBeenCalledTimes(1);

    expect(mockSuccessResponse).toHaveBeenCalledWith(mockProducts);
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify(mockProducts));
  });

  it('should return an error response when fetching products fails', async () => {
    const mockError = new Error('Service error');
    mockProductService.prototype.getAllProducts.mockRejectedValue(mockError);

    mockErrorResponse.mockReturnValue({
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch products' }),
    });

    const result = await getAllProducts();

    expect(mockProductService.prototype.getAllProducts).toHaveBeenCalledTimes(1);
    expect(mockErrorResponse).toHaveBeenCalledWith('Failed to fetch products');
    expect(result.statusCode).toBe(500);
    expect(result.body).toBe(JSON.stringify({ message: 'Failed to fetch products' }));
  });
});
