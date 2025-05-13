import { Schema, model } from "mongoose";

const ciudadSchema = new Schema(
  {
    nomCiudad: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
  }
);

const Ciudad = model('Ciudad', ciudadSchema, 'Ciudad');
export default Ciudad;
