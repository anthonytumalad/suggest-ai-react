export interface User {
    email: string;
    name: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
}