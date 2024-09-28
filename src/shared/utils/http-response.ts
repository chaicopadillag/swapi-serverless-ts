export const successResponse = (data: any) => ({
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

export const errorResponse = (error: string, statusCode = 500) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ error }),
});
