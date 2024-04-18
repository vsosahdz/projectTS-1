//const express = require('express'); //JS
import express from 'express'; //TS
import AbstractController from '../controllers/AbstractController';

class Server{
    //Atributos de instancia
    private app: express.Application;
    private port: number;
    private env:string;
    //Metodos de instancia

    constructor(appInit:{port:number;env:string;middlewares:any[];controllers:AbstractController[]}){
        this.app = express();
        this.port = appInit.port;
        this.env = appInit.env;
        
        
    }

    private loadRoutes(controllers:AbstractController[]):void{
        controllers.forEach((controller:AbstractController )=> {
            this.app.use(`/${controller.prefix}`,controller.router);
        })
    }

}