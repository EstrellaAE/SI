import { Schema, model } from 'mongoose';

const cargoSchema = new Schema({
  nomCargo: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

const Cargo = model('Cargo', cargoSchema, 'Cargo');
export default Cargo;
