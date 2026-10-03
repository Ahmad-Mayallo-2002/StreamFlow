export interface HttpError extends Error {
  response: {
    data: {
      message: string;
      statusCode: number;
      error: string;
    };
  };
}
