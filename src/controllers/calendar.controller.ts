import { Request, Response } from "express";
import Event from "../models/Event";
export const crearEvento = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    delete req.body.bgColor;

    const fechaInicio = new Date(req.body.start);
    const fechaFin = new Date(req.body.end);

    // Buscar eventos que se solapen con el nuevo evento
    const eventoExistente = await Event.findOne({
      $or: [
        // Caso 1: La fecha de inicio del nuevo evento cae dentro de un evento existente
        { start: { $lte: fechaInicio }, end: { $gte: fechaInicio } },
        // Caso 2: La fecha de fin del nuevo evento cae dentro de un evento existente
        { start: { $lte: fechaFin }, end: { $gte: fechaFin } },
        // Caso 3: El nuevo evento engloba completamente un evento existente
        { start: { $gte: fechaInicio }, end: { $lte: fechaFin } },
      ],
    });

    if (eventoExistente) {
      return res.status(400).json({
        success: false,
        msg: "Ya existe un evento en este rango de fechas",
      });
    }
    const evento = new Event(req.body);
    await evento.save();

    return res.status(201).json({
      success: true,
      msg: "Evento creado",
      evento,
    });
  } catch (error) {
    console.error("Error al crear evento:", error);
    return res.status(500).json({
      success: false,
      msg: "Error al crear evento",
    });
  }
};
export const actualizarEvento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Se obtiene el ID del evento a actualizar

    // Excluir la propiedad bgColor si existe en req.body
    if ("bgColor" in req.body) {
      delete req.body.bgColor;
    }

    const fechaInicio = new Date(req.body.start);
    const fechaFin = new Date(req.body.end);

    // Buscar eventos que se solapen con el nuevo evento
    const eventoExistente = await Event.findOne({
      $or: [
        // Caso 1: La fecha de inicio del nuevo evento cae dentro de un evento existente
        { start: { $lte: fechaInicio }, end: { $gte: fechaInicio } },
        // Caso 2: La fecha de fin del nuevo evento cae dentro de un evento existente
        { start: { $lte: fechaFin }, end: { $gte: fechaFin } },
        // Caso 3: El nuevo evento engloba completamente un evento existente
        { start: { $gte: fechaInicio }, end: { $lte: fechaFin } },
      ],
    });

    if (eventoExistente) {
      return res.status(400).json({
        success: false,
        msg: "Ya existe un evento en este rango de fechas",
      });
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
