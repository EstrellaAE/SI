import { Router } from "express";
import { personaController } from "../controllers/persona-controller";

class PersonaRoutes{

    public router:Router;

    constructor(){
        this.router=Router();

        this.config();
    }

    private config(){
        console.log('hecho')
        this.router.get('/',personaController.get);
        this.router.post('/',personaController.add);
    }
}

const personaRoutes=new PersonaRoutes();
export default personaRoutes.router;