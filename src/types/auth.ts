// Authentication types

export interface SignInRequest {
  email: string;
}

export interface SignUpRequest {
  email: string;
  name: string;
  role: 'student' | 'donor' | 'counselor';
}

export interface TokenVerificationRequest {
  token: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    isVerified: boolean;
  };
  token: string;
}

export interface EmailTokenRequest {
  email: string;
  type: 'signin' | 'signup';
}

export interface TokenValidationResult {
  isValid: boolean;
  userId?: string;
  error?: string;
}
