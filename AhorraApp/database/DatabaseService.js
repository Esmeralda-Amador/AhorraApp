import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

class DatabaseService {
    constructor() {
        this.db = null;
        this.initPromise = null;
    }

    async initialize() {
        if (Platform.OS === 'web') return;
        if (this.db) return;
        if (this.initPromise) {
            return this.initPromise;
        }

        this.initPromise = (async () => {
            try {
                const db = await SQLite.openDatabaseAsync('miapp_seguridad_final.db');
                
                await db.execAsync(`
                    CREATE TABLE IF NOT EXISTS usuarios (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        nombre TEXT NOT NULL,
                        correo TEXT UNIQUE NOT NULL,
                        password TEXT NOT NULL,
                        respuesta_seguridad TEXT NOT NULL, 
                        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
                    );
                    
                    CREATE TABLE IF NOT EXISTS transacciones (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        tipo TEXT NOT NULL,
                        categoria TEXT NOT NULL,
                        monto REAL NOT NULL,
                        descripcion TEXT,
                        fecha TEXT NOT NULL
                    );
                    
                    -- TABLA DE PRESUPUESTOS (NUEVO)
                    CREATE TABLE IF NOT EXISTS presupuestos (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        categoria TEXT NOT NULL,
                        monto_limite REAL NOT NULL,
                        fecha_inicio TEXT NOT NULL
                    );
                `);
                
                this.db = db;
            } catch (error) {
                console.error("Error crítico en DB:", error);
                throw error;
            } finally {
                this.initPromise = null;
            }
        })();

        return this.initPromise;
    }

    // --- MÉTODOS DE USUARIOS (Iguales) ---
    async getAll() { await this.initialize(); return await this.db.getAllAsync('SELECT * FROM usuarios ORDER BY id DESC'); }
    async getByCorreo(correo) { await this.initialize(); return await this.db.getFirstAsync('SELECT * FROM usuarios WHERE correo = ?', [correo]); }
    async add(nombre, correo, password, respuestaSeguridad) { await this.initialize(); /* ... */ }
    async update(id, nombre, correo) { await this.initialize(); /* ... */ }
    async updatePassword(id, newPassword) { await this.initialize(); /* ... */ }

    // --- MÉTODOS DE TRANSACCIONES (Iguales) ---
    async getAllTransacciones() { await this.initialize(); return await this.db.getAllAsync('SELECT * FROM transacciones ORDER BY id DESC'); }
    async addTransaccion(tipo, categoria, monto, descripcion, fecha) { await this.initialize(); /* ... */ }
    async updateTransaccion(id, tipo, categoria, monto, descripcion, fecha) { await this.initialize(); /* ... */ }
    async deleteTransaccion(id) { await this.initialize(); /* ... */ }

    // --- MÉTODOS DE PRESUPUESTOS (NUEVOS) ---

    async getAllPresupuestos() {
        await this.initialize();
        return await this.db.getAllAsync('SELECT * FROM presupuestos ORDER BY id DESC');
    }

    async addPresupuesto(categoria, montoLimite, fechaInicio) {
        await this.initialize();
        const result = await this.db.runAsync(
            'INSERT INTO presupuestos (categoria, monto_limite, fecha_inicio) VALUES (?, ?, ?)',
            [categoria, montoLimite, fechaInicio]
        );
        return result.lastInsertRowId;
    }

    async updatePresupuesto(id, categoria, montoLimite, fechaInicio) {
        await this.initialize();
        const result = await this.db.runAsync(
            'UPDATE presupuestos SET categoria = ?, monto_limite = ?, fecha_inicio = ? WHERE id = ?',
            [categoria, montoLimite, fechaLimite, id]
        );
        return result.changes > 0;
    }

    async deletePresupuesto(id) {
        await this.initialize();
        const result = await this.db.runAsync(
            'DELETE FROM presupuestos WHERE id = ?',
            [id]
        );
        return result.changes > 0;
    }
}

export default new DatabaseService();