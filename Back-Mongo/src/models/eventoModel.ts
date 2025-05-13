import { Schema, model } from "mongoose";

// Define un esquema interno para el array anidado 'evento'
const registro = new Schema({
  folio: {
    type: Number,
  },
  nombre: {
    type: String,
  },
  apP:{
    type:String,
  },
  apM:{
    type:String,
  },
  fechaRegistro: {
    type: Date,
    default: new Date(),
  },
});

// Define el esquema principal
const Evento = new Schema(
  {
    nombreEvento: {
      type: String,
      required:true
    },
    cupoMaximo: {
      type: Number,
      required:true
    },
    fecha: {
      type: Date,
      required:true
    },
    nomCiudad: {
      type: String,
      required:true
    },
    nomArea: {
      type: String,
      required:true
    },
    participantes: [registro], // Incrusta el esquema interno
  },
  {
    versionKey: false,
  }
);

const ModeloEvento = model("Evento", Evento, "Evento");
export default ModeloEvento;
