export interface ControlProps {
  variant?: "input" | "textarea";
  type?: "text" | "email" | "password";
  id?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder?: string;
  name?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
}

export interface FeedbackProps {
  type: "valid" | "invalid";
  children: React.ReactNode;
}

export interface FormProps {
  children: React.ReactNode;
  noValidate?: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  method: "post" | "get";
  id?: string;
  className?: string;
  success?: string;
  error?: string;
  loading?: boolean;
}

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
