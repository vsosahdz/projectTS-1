import { Request,Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";


class AgenteController extends AbstractController{
    //Singleton
    //Atributo de clase
    private static _instance: AgenteController;
    //Metodo de clase
    public static get instance():AbstractController{
        if(!this._instance){
            this._instance = new AgenteController("agente");
        }
        return this._instance;
    }
    //Declarar todas las rutas del controlador
    protected initRoutes(): void {
        this.router.get('/testagent',this.getTestAgent.bind(this));
        this.router.get('/consultarAgentes',this.getConsultarAgentes.bind(this));
        this.router.post('/crearAgente',this.postCrearAgente.bind(this));
        
    }

    //10.48.120.198

    private async postCrearAgente(req: Request,res: Response){
        try{
            console.log(req.body);
            await db.Agente.create(req.body); //INSERT
            console.log("Agente creado");
            res.status(200).send("<h1>Agente creado</h1>");

        }catch(error:any){
            console.log(error);
            res.status(500).send('Internal server error'+error);
        }
    }

    private async getConsultarAgentes(req: Request,res: Response){
        try{
            console.log("Consultar agentes");
            let agentes = await db["Agente"].findAll(); //SELECT * FROM Agente;
            res.status(200).json(agentes);

        }catch(error:any){
            console.log(error);
            res.status(500).send('Internal server error'+error);
        }
    }
    //Metodos de instancia
    private getTestAgent(req: Request,res: Response){
        try{
            console.log("Prueba exitosa");
            res.status(200).send("<h1>Prueba exitosa</h1>")
        }catch(error:any){
            console.log(error);
            res.status(500).send('Internal server error'+error);
        }
    }

}

export default AgenteController;