import { Request, Response } from "express";
import Persona from "../models/persona-model";

class PersonaController{

    public async get(req: Request, res: Response) {
        try {
            const evento = await Persona.find(); // Debe ser ItemModel.find({}, 'nombreEvento cupoMaximo fecha participante nomCiudad nomArea evento');
            return res.status(201).json(evento);
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    public async add(req: Request, res: Response) {
        try {
            await Persona.insertMany(req.body);
            return res.status(201).json({message:'Incercion Exitosa', code:0});
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

}

export const personaController=new PersonaController();