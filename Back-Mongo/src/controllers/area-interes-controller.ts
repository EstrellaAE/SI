import { Request, Response } from "express";
import areaInteres from "../models/area-interes-model";

class AreaInteresController{

    public async get(req: Request, res: Response) {
        try {
            const area = await areaInteres.find();
            return res.status(201).json(area);
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export const areaInteresController= new AreaInteresController();