// database/DatabaseService.js
import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

class DatabaseService {
  constructor() {
    this.db = null;
    this.tableName = 'presupuestos';
  }

  async initialize() {
    if (Platform.OS === 'web') {
      console.log('Web: usando localStorage');
      if (!localStorage.getItem(this.tableName)) {
        localStorage.setItem(this.tableName, JSON.stringify([]));
      }
    } else {
      console.log('Móvil: usando SQLite');
      this.db = await SQLite.openDatabaseAsync('miapp.db');
      await this.db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS ${this.tableName} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          categoria TEXT NOT NULL,
          monto REAL NOT NULL,
          fecha TEXT NOT NULL,
          fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }
  }

  async getAll() {
    if (Platform.OS === 'web') {
      const data = localStorage.getItem(this.tableName);
      return data ? JSON.parse(data) : [];
    } else {
      return await this.db.getAllAsync(`SELECT * FROM ${this.tableName} ORDER BY id DESC`);
    }
  }

  async add(presupuesto) {
    const { categoria, monto, fecha } = presupuesto;

    if (Platform.OS === 'web') {
      const lista = await this.getAll();
      const nuevo = {
        id: Date.now(),
        categoria: categoria.trim(),
        monto: parseFloat(monto),
        fecha,
        fecha_creacion: new Date().toISOString()
      };
      lista.unshift(nuevo);
      localStorage.setItem(this.tableName, JSON.stringify(lista));
      return nuevo;
    } else {
      const result = await this.db.runAsync(
        `INSERT INTO ${this.tableName} (categoria, monto, fecha) VALUES (?, ?, ?)`,
        categoria.trim(),
        parseFloat(monto),
        fecha
      );
      return {
        id: result.lastInsertRowId,
        categoria: categoria.trim(),
        monto: parseFloat(monto),
        fecha,
        fecha_creacion: new Date().toISOString()
      };
    }
  }
}

export default new DatabaseService();