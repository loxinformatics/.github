interface SuccessResponse {
  success: true;
  message: string;
}

interface ErrorResponse {
  success: false;
  message: string;
  error: string;
}

export type FormResponse = SuccessResponse | ErrorResponse;
