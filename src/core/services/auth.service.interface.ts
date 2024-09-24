import { LoginAuthDto, PublicUserDto } from "@/core/models";
import { RegisterAuthDto } from "../models/app/auth/register-auth.dto";
import { Response } from "express";
export interface AuthService {

  validateUser(username: string, password: string): Promise<PublicUserDto | undefined>;

  login(payload: LoginAuthDto, res: Response): Promise<any>;

  register(payload: RegisterAuthDto, res: Response): Promise<any>;
}

export const AUTH_SERVICE = 'AuthService';
