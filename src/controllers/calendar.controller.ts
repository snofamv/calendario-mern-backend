import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/User";
import generarJWT from "../helpers/jwt";
import { CustomRequest } from "../middlewares/validar-jwt";
import jsonwebtoken from "jsonwebtoken";
import Event from "../models/Event";
export const crearEvento = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // ARGEGAR MIDDLEWARE
  try {
    delete req.body.bgColor;
    const evento = new Event(req.body);
    console.log("BACKEND EVENTO;:", evento);
    evento.save();
    return res
      .status(201)
      .json({ success: true, msg: "Evento creado", evento });
  } catch (error) {
    throw new Error("Error al crear evento.");
  }
};

export const actualizarEvento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Se obtiene el ID del evento a actualizar

    // Excluir la propiedad bgColor si existe en req.body
    if ("bgColor" in req.body) {
      delete req.body.bgColor;
    }

    // Buscar y actualizar el evento
    const eventoActualizado = await Event.findByIdAndUpdate(id, req.body, {
      new: true, // Devuelve el evento actualizado en la respuesta
      runValidators: true, // Asegura que se validen los datos antes de actualizar
    });

    if (!eventoActualizado) {
      return res
        .status(404)
        .json({ success: false, msg: "Evento no encontrado" });
    }

    return res.json({
      success: true,
      msg: "Evento actualizado",
      evento: eventoActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar evento:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Error al actualizar evento" });
  }
};

export const getEventos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Obtener todos los eventos de la base de datos
    const eventos = await Event.find();
    console.log(eventos);

    if (!eventos || eventos.length === 0) {
      return res.status(400).json({ success: false, msg: "No results" });
    }
    return res.status(200).json({ success: true, eventos });
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    throw new Error("Error al obtener evento.");
  }
};
