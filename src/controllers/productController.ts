import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { HttpStatusCode } from 'axios';
import { ProductService } from '../services/product.service';
import { errorResponse, successResponse } from '../shared/utils/http-response';

const productService = new ProductService();

export const createProduct = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return errorResponse('Los datos enviados no son válidos', HttpStatusCode.UnprocessableEntity);
    }

    const body = JSON.parse(event.body);

    const product = await productService.createProduct(body);

    return successResponse(product);
  } catch (error: any) {
    console.error('Error fetching save product:', error);

    return errorResponse('Failed to fetch save product');
  }
};

export const getAllProducts = async (): Promise<APIGatewayProxyResult> => {
  try {
    const products = await productService.getAllProducts();

    return successResponse(products);
  } catch (error: any) {
    console.error('Error fetching products:', error);

    return errorResponse('Failed to fetch products');
  }
};
