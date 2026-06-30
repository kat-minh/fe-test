export interface LoginRequest{
    email: string
    password: string
}

export interface LoginResponse{
    token: string;
    user: {
        id: string;
        email: string;
        fullName: string;
        role: "admin" | "employee";
    };
}
