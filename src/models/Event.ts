import mongoose, { Schema, model } from "mongoose";

const Event = new Schema({
  // _id: { type: Schema.Types.ObjectId, required: true }, // ID del usuario
  title: { type: String, required: true },
  notes: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  user: {
    _id: { type: Schema.Types.ObjectId, required: false }, // ID del usuario
    name: { type: String, required: true }, // Nombre del usuario
  },
});

export default model("evento", Event);
