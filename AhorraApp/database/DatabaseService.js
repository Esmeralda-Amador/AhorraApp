import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

class DatabaseService {
    constructor(){
        this.db = null;
        this.storageKey = 'usuarios';
    }

    async initialize(){
        if(Platform.OS === "web"){
            console.log('Usando LocalStorage para web');
        }
        else {
            console.log('Usando SQLite para móvil');
            this.db = await SQLite.openDatabaseAsync('miapp.db');
            await this.db.execAsync(`
                CREATE TABLE IF NO EXISTS montos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    categoria TEXT NOT NULL,
                    monto TEXT NOT NULL
                    fecha_creación DATETIME DEFAULT CURRENT_TIMESTAMP 
                ); 
            `);
        }//El fecha_creacion queda pendiente Y MONTO
    }

    async getAll() {
        if (Platform.OS === 'web') {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } else {
            return await this.db.getAllAsync('SELECT * FROM categoria ORDER BY id DESC');
        }
    }

    async add(categoria){
        if(Platform.OS === 'web'){
            const presupuesto = await this.getAll();

            const nuevoPresupuesto = {
                id: Date.now(),
                categoria,
                fecha_creacion
            };

            presupuesto.unshift(nuevoPresupuesto);
            localStorage.setItem(this.storageKey, JSON.stringify(presupuesto));
            return nuevoPresupuesto;
        }
        else{
            const result = await this.db.runAsync(
                'INSERT INTO presupuesto(categoria) VALUES(?)',
                categoria
            );
            return {
                id: result.lastInsertRowId,
                categoria,
                fecha_creacion
            };
        }
    }
}


export default new DatabaseService();
