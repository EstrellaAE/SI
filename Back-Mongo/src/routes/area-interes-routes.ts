import { Router } from "express";
import { areaInteresController } from "../controllers/area-interes-controller";

class AreaInteresRoutes{

    public router:Router;

    constructor(){
        this.router=Router();

        this.config();
    }

    private config(){
        this.router.get('/',areaInteresController.get);
    }
}

const areaInteresRoutes=new AreaInteresRoutes();
export default areaInteresRoutes.router;