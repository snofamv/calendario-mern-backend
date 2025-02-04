import { Request, Response, Router } from "express";
import {
  actualizarEvento,
  crearEvento,
  getEventos,
} from "../controllers/calendar.controller";
import { check } from "express-validator";
import { validarDatos } from "../middlewares/validar-datos";
const calendarRoutes = Router();

calendarRoutes.get("/", getEventos);
calendarRoutes.post(
  "/new",
  [
    check("title", "El título es obligatorio").notEmpty(),
    check("notes", "La descripción del evento es obligatoria").notEmpty(),
    check("start", "La fecha de inicio es obligatoria").notEmpty(),
    check("end", "La fecha de fin es obligatoria").notEmpty(),

    // Validación para el objeto 'user'
    check("user", "El usuario debe ser un objeto").isObject(),
    check("user", "El usuario debe contener datos").notEmpty(),
    check("user._id", "El campo _id del usuario es obligatorio").notEmpty(),
    check("user.name", "El campo name del usuario es obligatorio").notEmpty(),

    validarDatos, // Asumiendo que esta es tu función de validación personalizada
  ],
  crearEvento
);

calendarRoutes.patch(
  "/update/:id",
  [
    check("title", "El título es obligatorio").notEmpty(),
    check("notes", "La descripción del evento es obligatoria").notEmpty(),
    check("start", "La fecha de inicio es obligatoria").notEmpty(),
    check("end", "La fecha de fin es obligatoria").notEmpty(),

    // Validación para el objeto 'user'
    check("user", "El usuario debe ser un objeto").isObject(),
    check("user", "El usuario debe contener datos").notEmpty(),
    check("user._id", "El campo _id del usuario es obligatorio").notEmpty(),
    check("user.name", "El campo name del usuario es obligatorio").notEmpty(),

    validarDatos, // Asumiendo que esta es tu función de validación personalizada
  ],
  actualizarEvento
);
export default calendarRoutes;
