import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

class DatabaseService {
    constructor() {
        this.db = null;
        this.initPromise = null; // Guardamos la promesa de inicialización
    }

    async initialize() {
        if (Platform.OS === 'web') return;

        // 1. Si ya tenemos DB, retornamos inmediatamente.
        if (this.db) return;

        // 2. Si ya hay una inicialización en proceso, devolvemos esa misma promesa
        // para que todos esperen a la vez, en lugar de chocar.
        if (this.initPromise) {
            return this.initPromise;
        }

        // 3. Creamos la promesa de inicialización
        this.initPromise = (async () => {
            try {
                console.log('Iniciando conexión SQLite...');
                // Usamos un nombre seguro
                const db = await SQLite.openDatabaseAsync('miapp_seguridad_final.db');
                
                // Ejecutamos la creación de tablas
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
                `);
                
                // Solo asignamos la DB si todo salió bien
                this.db = db;
                console.log('Base de datos lista y tablas creadas.');
                
            } catch (error) {
                console.error("Error crítico en DB:", error);
                throw error; // Relanzar para que el UI sepa que falló
            } finally {
                // Limpiamos la promesa para el futuro
                this.initPromise = null;
            }
        })();

        return this.initPromise;
    }

    // --- MÉTODOS DE USUARIOS ---
    async getAll() {
        await this.initialize(); 
        return await this.db.getAllAsync('SELECT * FROM usuarios ORDER BY id DESC');
    }

    async getByCorreo(correo) {
        await this.initialize();
        return await this.db.getFirstAsync('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    }

    async add(nombre, correo, password, respuestaSeguridad) {
        await this.initialize();
        const result = await this.db.runAsync(
            'INSERT INTO usuarios (nombre, correo, password, respuesta_seguridad) VALUES(?, ?, ?, ?)',
            [nombre, correo, password, respuestaSeguridad]
        );
        return {
            id: result.lastInsertRowId,
            nombre,
            correo,
            password,
            respuesta_seguridad: respuestaSeguridad,
            fecha_creacion: new Date().toISOString()
        };
    }

    async update(id, nombre, correo) {
        await this.initialize();
        const result = await this.db.runAsync(
            'UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?',
            [nombre, correo, id]
        );
        return result.changes > 0;
    }

    async updatePassword(id, newPassword) {
        await this.initialize();
        const result = await this.db.runAsync(
            'UPDATE usuarios SET password = ? WHERE id = ?',
            [newPassword, id]
        );
        return result.changes > 0;
    }

    // --- MÉTODOS DE TRANSACCIONES ---

    async getAllTransacciones() {
        await this.initialize();
        return await this.db.getAllAsync('SELECT * FROM transacciones ORDER BY id DESC');
    }

    async addTransaccion(tipo, categoria, monto, descripcion, fecha) {
        await this.initialize();
        const result = await this.db.runAsync(
            'INSERT INTO transacciones (tipo, categoria, monto, descripcion, fecha) VALUES (?, ?, ?, ?, ?)',
            [tipo, categoria, monto, descripcion, fecha]
        );
        return result.lastInsertRowId;
    }

    async updateTransaccion(id, tipo, categoria, monto, descripcion, fecha) {
        await this.initialize();
        const result = await this.db.runAsync(
            'UPDATE transacciones SET tipo = ?, categoria = ?, monto = ?, descripcion = ?, fecha = ? WHERE id = ?',
            [tipo, categoria, monto, descripcion, fecha, id]
        );
        return result.changes > 0;
    }

    async deleteTransaccion(id) {
        await this.initialize();
        const result = await this.db.runAsync(
            'DELETE FROM transacciones WHERE id = ?',
            [id]
        );
        return result.changes > 0;
    }
}

export default new DatabaseService();