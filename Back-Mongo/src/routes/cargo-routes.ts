import { Router } from 'express';
import { cargoController } from '../controllers/cargo-controller';

class CargoRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.get('/', cargoController.get);
  }
}

const cargoRoutes = new CargoRoutes();
export default cargoRoutes.router;
