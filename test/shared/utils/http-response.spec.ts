import { errorResponse, successResponse } from '../../../src/shared/utils/http-response';

describe('Response Utility Functions', () => {
  describe('successResponse', () => {
    it('should return a success response with status 200', () => {
      const data = { message: 'Success' };
      const response = successResponse(data);

      expect(response).toEqual({
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    });

    it('should return a valid JSON body', () => {
      const data = { id: 123, name: 'Product' };
      const response = successResponse(data);

      expect(response.body).toBe(JSON.stringify(data));
    });
  });

  describe('errorResponse', () => {
    it('should return an error response with a default status of 500', () => {
      const error = 'Internal Server Error';
      const response = errorResponse(error);

      expect(response).toEqual({
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error }),
      });
    });

    it('should return an error response with a custom status code', () => {
      const error = 'Bad Request';
      const statusCode = 400;
      const response = errorResponse(error, statusCode);

      expect(response).toEqual({
        statusCode,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error }),
      });
    });

    it('should return a valid JSON error message', () => {
      const error = 'Resource not found';
      const response = errorResponse(error, 404);

      expect(response.body).toBe(JSON.stringify({ error }));
    });
  });
});
