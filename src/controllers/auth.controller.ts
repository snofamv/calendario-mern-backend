import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/User";
import generarJWT from "../helpers/jwt";
import { CustomRequest } from "../middlewares/validar-jwt";
import jsonwebtoken from "jsonwebtoken";
export const crearUsuario = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;

  try {
    let usuario = await User.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        success: false,
        msg: "El email ya existe",
      });
    }
    usuario = new User(req.body);
    usuario.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
    usuario.save();
    return res.status(201).json({
      success: true,
      msg: { id: usuario.id, email: usuario.email },
    });
  } catch (error) {
    throw new Error("Error al crear usuario.");
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    let usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        success: false,
        msg: "Email incorrecto",
      });
    }
    let validPassword = bcrypt.compare(password, usuario.password!);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        msg: "Contraseña incorrecta",
      });
    }
    // generar token
    const token = await generarJWT(usuario.id!, usuario.name!);
    return res.status(201).json({
      success: true,
      msg: { uid: usuario.id, name: usuario.name, token },
    });
  } catch (error) {
    throw new Error("Error al crear usuario.");
  }
};
export const revalidarToken = async (req: CustomRequest, res: Response) => {
  const uid = req.uid;
  const name = req.name;

  try {
    const newToken = await generarJWT(uid!, name!);

    return res.json({
      success: true,
      msg: "New token",
      uid,
      name,
      token: newToken,
    });
  } catch (error) {
    throw new Error("Error al generar al revalidar token.");
  }
};
