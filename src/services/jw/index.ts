import { User } from "@prisma/client";
import Jwt from "jsonwebtoken";
import { JwtUser } from "../../types/graphQlContext";

const JWT_SECRET = process.env.JWT_SECRET;
class JwtService {
  // creating user token
  public static async generateTokenForUser(user: User) {
    try {
      // payload for jwt
      const payload: JwtUser = {
        id: user.id,
        email: user.email,
      };

      //    creating token
      const token = Jwt.sign(payload, JWT_SECRET, {
        expiresIn: "24h",
      });
      return token;
    } catch (error: any) {
      return error.message;
    }
  }

  // decoding user token
  public static async decodeUserToken(token: string) {
    const user = Jwt.verify(token, JWT_SECRET);
    return user as JwtUser;
  }
}

export default JwtService;
