import { Router } from "express";
import { check } from "express-validator";
import {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} from "../controllers/auth.controller";
import { validarDatos } from "../middlewares/validar-datos";
import validarJwt from "../middlewares/validar-jwt";
const authRoutes = Router();
authRoutes.post(
  "/",
  [
    check("email", "El email es obligatorio").notEmpty(),
    check("email", "El email debe tener formato correcto").isEmail(),
    check("password", "El password es obligatorio").notEmpty(),
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 3,
    }),
    validarDatos,
  ],
  loginUsuario
);

authRoutes.post(
  "/new",
  [
    check("email", "El email es obligatorio").notEmpty(),
    check("email", "El email debe tener formato correcto").isEmail(),
    check("name", "El nombre es obligatorio").notEmpty(),
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarDatos,
  ],
  crearUsuario
);
authRoutes.get("/renew", validarJwt, revalidarToken);
export default authRoutes;
