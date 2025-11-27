import { Usuario } from "../models/usuario";
import DatabaseService from "../database/DatabaseService";


export class PresupuestoController {
    constructor(){
        this.listeners = [];
    }

    async initialize(){
        await DatabaseService.initialize();
    }

    async obtenerPresupuestos(){
        try {
            const data = await DatabaseService.getAll();
            return data.map(u => new Usuario(u.id, u.categoria, u.fecha_creacion));
        }
        catch(error){
            console.error('Error al obtener los presupuestos', error);
            throw new Error('No se pudieron cargar los presupuestos')

        }
    }

    async crearPresupuesto(categoria){
        try{
            Usuario.validar(categoria);

            const nuevoPresupuesto = await DatabaseService.add(categoria.trim());
            this.notifyListeners();
            return new Usuario(
                nuevoPresupuesto.id,
                nuevoPresupuesto.categoria,
                nuevoPresupuesto.fecha_creacion
            );
        }
        catch(error){
            console.error('Error al crear el usuario', error);
            throw error;
        }

    }

    addListener(callback){
        this.listeners.push(callback);
    }

    removeListener(callback){
        this.listeners = this.listeners.filter( l => l !== callback);
    }

    notifyListeners(){
        this.listeners.forEach(callback => callback())
    }
}

