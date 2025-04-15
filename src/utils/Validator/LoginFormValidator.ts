// utils/validator/LoginFormValidator.ts

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const LoginFormValidator = (formData: LoginFormData): ValidationResult => {
  const errors: string[] = [];
  let isValid = true;

  if (!formData.email.includes('@')) {
    errors.push('Invalid email address');
    isValid = false;
  }

  return { isValid, errors };
};
