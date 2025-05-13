import { Request, Response } from 'express';
import Cargo from '../models/cargo-model';

class CargoController {
  public async get(req: Request, res: Response) {
    try {
      const cargos = await Cargo.find();
      return res.status(200).json(cargos);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener cargos' });
    }
  }
}

export const cargoController = new CargoController();
