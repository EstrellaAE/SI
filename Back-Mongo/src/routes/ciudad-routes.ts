import { Router } from "express";
import { ciudadController } from "../controllers/ciudad-controller";

class CiudadRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.get('/', ciudadController.get);
  }
}

const ciudadRoutes = new CiudadRoutes();
export default ciudadRoutes.router;
