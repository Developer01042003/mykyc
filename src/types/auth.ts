export interface SignUpData {
    full_name: string;
    username: string;
    email: string;
    password: string;
    whatsapp: string;
    gender: string;
    address: string;
    country: string;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: {
      id: string;
      email: string;
      full_name: string;
    };
  }