import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";

class DatabaseService {
    constructor() {
        this.db = null;
        this.storageKey = "transacciones"; 
    }
    
    async initialize() {
        if (Platform.OS === "web") {
            console.log("Usando localStorage para la web"); 
        } else {
            console.log("Usando SQLite para el móvil");
            this.db = await SQLite.openDatabaseAsync("miapp.db"); 
            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS transacciones (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    categoria TEXT NOT NULL,
                    monto REAL NOT NULL,
                    dia INTEGER NOT NULL,
                    mes INTEGER NOT NULL,
                    year INTEGER NOT NULL,
                    tipo TEXT NOT NULL,
                    descripcion TEXT
                );
            `);
        }
    }

    async getALL() {
        if (Platform.OS === 'web') {
            const data = localStorage.getItem(this.storageKey); 
            const transacciones = data ? JSON.parse(data) : [];
            return transacciones.sort((a, b) => {
                if (a.year !== b.year) return b.year - a.year;
                if (a.mes !== b.mes) return b.mes - a.mes;
                return b.dia - a.dia;
            });
        } else {
            const result = await this.db.getAllAsync(
                'SELECT * FROM transacciones ORDER BY year DESC, mes DESC, dia DESC'
            ); 
            return result;
        }
    }

    async add({ categoria, monto, dia, mes, year, tipo, descripcion }) {
        if (Platform.OS === 'web') {
            const transacciones = await this.getALL();
            const nuevaTransaccion = {
                id: Date.now(),
                categoria,
                monto,
                dia,
                mes,
                year,
                tipo,
                descripcion: descripcion || ""
            };
            transacciones.unshift(nuevaTransaccion);
            localStorage.setItem(this.storageKey, JSON.stringify(transacciones)); 
            return nuevaTransaccion;
        } else {
            const result = await this.db.runAsync(
                'INSERT INTO transacciones(categoria, monto, dia, mes, year, tipo, descripcion) VALUES(?, ?, ?, ?, ?, ?, ?)',
                categoria, monto, dia, mes, year, tipo, descripcion || ""
            );
            return {
                id: result.lastInsertRowId,
                categoria,
                monto,
                dia,
                mes,
                year,
                tipo,
                descripcion: descripcion || ""
            };
        }
    }
    
    async update(id, { categoria, monto, dia, mes, year, tipo, descripcion }) {
        const numericId = Number(id);
        if (Platform.OS === 'web') {
            const transacciones = await this.getALL();
            const index = transacciones.findIndex(t => t.id === numericId);
            if (index !== -1) {
                transacciones[index] = { id: numericId, categoria, monto, dia, mes, year, tipo, descripcion: descripcion || "" };
                localStorage.setItem(this.storageKey, JSON.stringify(transacciones));
                return true;
            }
            return false;
        } else {
            const result = await this.db.runAsync(
                'UPDATE transacciones SET categoria = ?, monto = ?, dia = ?, mes = ?, year = ?, tipo = ?, descripcion = ? WHERE id = ?',
                categoria, monto, dia, mes, year, tipo, descripcion || "", numericId
            );
            return result.changes > 0;
        }
    }

    async remove(id) {
        const numericId = Number(id); 

        if (Platform.OS === 'web') {
            let transacciones = await this.getALL();
            const initialLength = transacciones.length;
            transacciones = transacciones.filter(t => t.id !== numericId); 
            localStorage.setItem(this.storageKey, JSON.stringify(transacciones));
            return transacciones.length !== initialLength; 
        } else {
            const result = await this.db.runAsync(
                'DELETE FROM transacciones WHERE id = ?',
                numericId
            );
            return result.changes > 0;
        }
    }

    async getByDate({ dia, mes, year }) {
        if (Platform.OS === 'web') {
            const transacciones = await this.getALL();
            return transacciones.filter(t =>
                (dia === undefined || t.dia === dia) &&
                (mes === undefined || t.mes === mes) &&
                (year === undefined || t.year === year)
            ).sort((a, b) => {
                if (a.year !== b.year) return b.year - a.year;
                if (a.mes !== b.mes) return b.mes - a.mes;
                return b.dia - a.dia;
            });
        } else {
            let query = 'SELECT * FROM transacciones WHERE 1=1';
            const params = [];
            if (dia !== undefined) {
                query += ' AND dia = ?';
                params.push(dia);
            }
            if (mes !== undefined) {
                query += ' AND mes = ?';
                params.push(mes);
            }
            if (year !== undefined) {
                query += ' AND year = ?';
                params.push(year);
            }
            query += ' ORDER BY year DESC, mes DESC, dia DESC';
            const result = await this.db.getAllAsync(query, ...params);
            return result;
        }
    }

    async getByDateRange({ startDate, endDate }) {
        if (!startDate || !endDate) return [];

        const toNumber = (d) => d.year * 10000 + d.mes * 100 + d.dia;

        if (Platform.OS === 'web') {
            const transacciones = await this.getALL();
            return transacciones.filter(t => {
                const n = toNumber(t);
                return n >= toNumber(startDate) && n <= toNumber(endDate);
            }).sort((a, b) => {
                if (a.year !== b.year) return b.year - a.year;
                if (a.mes !== b.mes) return b.mes - a.mes;
                return b.dia - a.dia;
            });
        } else {
            const startNum = toNumber(startDate);
            const endNum = toNumber(endDate);
            const query = `
                SELECT * FROM transacciones
                WHERE (year*10000 + mes*100 + dia) BETWEEN ? AND ?
                ORDER BY year DESC, mes DESC, dia DESC
            `;
            const result = await this.db.getAllAsync(query, startNum, endNum);
            return result;
        }
    }
}

export default new DatabaseService();
