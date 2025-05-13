import { Router } from "express";
import { eventosController } from "../controllers/evento-controller";

class EventosRoutes {


    public router: Router;


    constructor() {
        this.router = Router();
        this.config();
    }


    private config() {
        this.router.get('/', eventosController.get);
        this.router.get('/eventos/:fechaEvento', eventosController.getEventByDay);
        this.router.post('/',eventosController.add );
        this.router.post('/participante/:evento',eventosController.addPart );
        this.router.get('/participante/:evento',eventosController.getPart );
        this.router.get('/participante/:evento/:areaInteres/:option',eventosController.getPartByArea );
        this.router.get('/stats/:evento',eventosController.getParticipationStats );
        this.router.delete('/participante/:evento/:folio',eventosController.addPart );
    }
}
const eventosRoutes = new EventosRoutes();
export default eventosRoutes.router;