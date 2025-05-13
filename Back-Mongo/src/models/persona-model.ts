import { Schema, model } from "mongoose";

const personaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apP: {
      type: String,
      required: true,
    },
    apM: {
      type: String,
      required: true,
    },
    edad: {
      type: Number,
      required: true,
    },
    genero: {
      type: String,
      enum: ['M', 'F', "Otro"],
      required: true,
    },
    nomArea: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    nomCargo: {
      type: String,
      required: true,
    },
    ciudad:{
      type:String,
      required:true
    }
  },
  {
    versionKey: false,
  }
);

const Persona = model("Persona", personaSchema, "Persona");
export default Persona;
