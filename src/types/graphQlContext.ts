import { Request, Response } from "express";
import { Jwt } from "jsonwebtoken";
export interface JwtUser {
  id: string;
  email: string;
}
export interface GraphQlContext {
  req?: Request;
  res?: Response;
  user?: JwtUser;
}
