import { Evento } from './../interfaces/evento';
import { Request, Response } from "express";
import eventoModel from "../models/eventoModel";
import Persona from "../models/persona-model";

class EventosController {
  public async add(req: Request, res: Response) {
    try {
      const evento:Evento=req.body
      if(evento.nombreEvento=="" || evento.cupoMaximo===0 || evento.fecha==="" || evento.nomArea=='' || evento.nomCiudad==''){
        return res.status(400).json({ message: "Todos los campos deben estar llenos", code: 0 });
      }

      await eventoModel.insertMany(req.body);
      return res.status(201).json({ message: "Incercion Exitosa :)", code: 0 });
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const evento = await eventoModel.find().sort({fecha:1});
      return res.status(201).json(evento);
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    
  }

  public async getEventByDay(req: Request, res: Response) {

    const {fechaEvento} =req.params
    try {
      const evento = await eventoModel.find({fecha:{$eq:fechaEvento}}).sort({fecha:1});
      return res.status(201).json(evento);
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }


  //Evento para agregar participantes
  public async addPart(req: Request, res: Response) {
    try {
      const { evento } = req.params;
      let participante = req.body;

      if (participante.nombre==="" || participante.apP==="" || participante.apM==="") {
        return res.status(404).json({
          message: "Datos vacíos",
          code: 0,
        }); 
      }      

      const nomParticipante =
        participante.nombre + " " + participante.apP + " " + participante.apM;
      const personaExist = await Persona.aggregate([
        {
          $project: {
            nombreCompleto: { $concat: ["$nombre", " ", "$apP", " ", "$apM"] },
          },
        },
        {
          $match: { nombreCompleto: nomParticipante },
        },
      ]);
      const event = await eventoModel.findOne({
        nombreEvento: { $eq: evento },
      });

      const maxFolio = await eventoModel.aggregate([
        { $unwind: "$participantes" },
        { $group: { _id: null, maxFolio: { $max: "$participantes.folio" } } },
      ]);
  
      let nuevoFolio = 1; // Valor predeterminado si no hay participantes registrados
      if (maxFolio.length !== 0) {
        nuevoFolio = maxFolio[0].maxFolio + 1;
      }

      participante.folio=nuevoFolio;

      if (personaExist.length === 0) {
        return res.status(404).json({
          message: "La persona no está registrada en la página",
          code: 1,
        });
      }
      if (!event) {
        return res
          .status(404)
          .json({ message: "El evento no fue encontrado", code: 1 });
      }

      const asistencia = await eventoModel.aggregate([
        {
            $match: {
            nombreEvento: evento,
            'participantes.nombre': participante.nombre,
            'participantes.apP': participante.apP,
            'participantes.apM': participante.apM
            }
        }
        ]);
      if (asistencia.length !!= 0) {
        return res
          .status(404)
          .json({ message: "Ya estas apuntado en este evento", code: 1 });
      }
      // Agregar el participante al evento
      if(event.cupoMaximo==0){
        return res
          .status(400)
          .json({ message: "Evento Lleno :(", code: 3 });
      }
      event.cupoMaximo--
      event.participantes.push(participante);
      // Guardar los cambios en la base de datos
      await event.save();
      return res
        .status(201)
        .json({ message: "Inserción exitosa", code: 0 });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  public async getPart(req: Request, res: Response) {
    try {
      const { evento } = req.params;
  
      // Utilizar agregación para obtener los participantes ordenados por apellido y fecha de registro
      const participantesOrdenados = await eventoModel.aggregate([
        { $match: { nombreEvento: evento } },
        { $unwind: "$participantes" },
        {
          $project: {
            _id: 0,
            nombreCompleto: {
              $concat: [
                "$participantes.apP",
                " ",
                "$participantes.apM",
                " ",
                "$participantes.nombre",  
              ]
            },
            fechaRegistro: "$participantes.fechaRegistro"
          }
        },
        { $sort: { "nombreCompleto": 1, "fechaRegistro": 1 } }
      ]);
  
      return res.status(200).json(participantesOrdenados);
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  public async getPartByArea(req: Request, res: Response) {
    try {
      const { evento, areaInteres, option } = req.params;
      console.log('recibido')
      // Verificar si se proporcionaron los parámetros de evento y área de interés
      if (!evento || !areaInteres) {
        return res.status(400).json({ message: 'Los parámetros de evento y área de interés son requeridos' });
      }
  
      // Obtener participantes del evento solicitado
      const participantesEvento = await eventoModel.aggregate([
        { $match: { nombreEvento: evento } },
        { $unwind: "$participantes" },
        {
          $project: {
            _id: 0,
            nombreParticipante: "$participantes.nombre"
          }
        }
      ]);
  
      // Extraer los nombres de los participantes del evento
      const nombresParticipantes = participantesEvento.map(participante => participante.nombreParticipante);
  
      // Consultar los participantes de la colección Persona que coincidan con el área de interés
      const participantesPorArea = await Persona.aggregate([
        { $match: { nombre: { $in: nombresParticipantes }, nomArea: areaInteres } },
        {
          $project: {
            _id: 0,
            nombreCompleto: {
              $concat: [
                "$nombre",
                " ",
                "$apP",
                " ",
                "$apM"
              ]
            },
            genero: 1
          }
        },
        {
          $group: {
            _id: "$genero",
            participantes: { $push: {"nomComp":"$nombreCompleto"} }
          }
        }
      ]);
  
      // Construir las tablas de participantes masculinos y femeninos
      const tablaMasculinos = participantesPorArea.find(p => p._id === 'M')?.participantes;
      const tablaFemeninos = participantesPorArea.find(p => p._id === 'F')?.participantes;
  
      if(option=='1'){
        return res.status(200).json( tablaMasculinos );
      }else{
        return res.status(200).json( tablaFemeninos );
      }
      
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  public async getParticipationStats(req: Request, res: Response) {
    try {
      const { evento }=req.params
      // Calcular el porcentaje de participación para cada evento
      const participationByEvent = await eventoModel.aggregate([
        { 
          $match: { nombreEvento: evento } 
        },{
          $project: {
            _id: 0,
            porcentajeParticipacion: {
              $multiply: [
                { $divide: [ { $size: "$participantes" }, "$cupoMaximo" ] },
                100
              ]
            }
          }
        }
      ]);

      // Calcular el porcentaje global de asistencias
      const globalAttendance = await eventoModel.aggregate([
        {
          $group: {
            _id: null,
            totalAsistentes: { $sum: { $size: "$participantes" } },
            totalCuposDisponibles: { $sum: "$cupoMaximo" }
          }
        },
        {
          $project: {
            _id: 0,
            globalAttendance: {
              $multiply: [
                { $divide: [ "$totalAsistentes", "$totalCuposDisponibles" ] },
                100
              ]
            }
          }
        }
      ]);

      const participantesEvento = await eventoModel.aggregate([
        { $match: { nombreEvento: evento } },
        { $unwind: "$participantes" },
        {
          $project: {
            _id: 0,
            nombreParticipante: "$participantes.nombre"
          }
        }
      ]);
      
      // Extraer los nombres de los participantes del evento
      const nombresParticipantes = participantesEvento.map(participante => participante.nombreParticipante);

      // Consultar los participantes de la colección Persona que coincidan con el área de interés
      const participantesPorGenero = await Persona.aggregate([
        { $match: { nombre: { $in: nombresParticipantes } } },
        {
          $group: {
            _id: "$genero",
            total: { $sum: 1 }
          }
        }
      ]);

      // Calcular el total de participantes en el evento
      const totalParticipantes = nombresParticipantes.length;

      // Calcular el porcentaje de participación por género
      const participacionPorGenero = participantesPorGenero.map(genero => ({
        genero: genero._id,
        total: genero.total,
        porcentaje: ((genero.total / totalParticipantes) * 100).toFixed(2)
      }));

      participationByEvent[0].porcentajeParticipacion = parseFloat(
        participationByEvent[0].porcentajeParticipacion.toFixed(2)
      );

      globalAttendance[0].globalAttendance = parseFloat(
        globalAttendance[0].globalAttendance.toFixed(2)
      );

      participacionPorGenero.forEach((genero) => {
        genero.porcentaje = parseFloat(genero.porcentaje).toFixed(2);
      });

      return res.status(200).json({participationByEvent, globalAttendance, participacionPorGenero });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  public async delPart(req: Request, res: Response) {
    try {
        const { eventoName,folio } = req.params;
        // Buscar el evento por su identificador único
        const evento = await eventoModel.findById(eventoName);
  
        if (!evento) {
          return res.status(404).json({ message: 'El evento no fue encontrado', code: 1 });
        }
  
        // Encontrar el índice del participante dentro del array de participantes del evento
        const participanteIndex = evento.participantes.findIndex(participante => participante.folio.toString() === folio);
  
        if (participanteIndex === -1) {
          return res.status(404).json({ message: 'El participante no fue encontrado en el evento', code: 2 });
        }
  
        // Eliminar el participante del array de participantes del evento
        evento.participantes.splice(participanteIndex, 1);
  
        // Guardar los cambios en la base de datos
        await evento.save();
  
        return res.status(200).json({ message: 'Eliminación exitosa del participante', code: 0 });
      } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: "Error interno del servidor" });
      }
  }
}

export const eventosController = new EventosController();
