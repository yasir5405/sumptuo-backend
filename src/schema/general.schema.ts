export type ApiError = {
  code?: number;
  message: string;
};

export type ApiResponse<T> = {
  data: T | null;
  success: boolean;
  message: string;
  error?: ApiError;
};
