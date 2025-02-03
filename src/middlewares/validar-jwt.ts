import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

// Extendemos la interfaz Request localmente
export interface CustomRequest extends Request {
  uid?: string;
  name?: string;
}

const validarJwt = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const secret = process.env.SECRET_JWT || "";
    const payload = jsonwebtoken.verify(token, secret) as JwtPayload;
    console.log("PAYLOAD: ", payload);

    req.uid = payload.uid;
    req.name = payload.name;
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: "Token no válido",
    });
  }

  next();
};

export default validarJwt;
