// DatabaseService.js
import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";

class DatabaseService {
  constructor() {
    this.db = null;
    this.storageKey = "transacciones";
  }

  // Inicializar la base de datos
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
          año INTEGER NOT NULL,
          tipo TEXT NOT NULL,
          fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }
  }

  // Obtener todas las transacciones
  async getAll() {
    if (Platform.OS === "web") {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } else {
      const result = await this.db.getAllAsync(
        "SELECT * FROM transacciones ORDER BY id DESC"
      );
      return result;
    }
  }

  // Agregar transacción
  async add({ categoria, monto, dia, mes, año, tipo }) {
    if (Platform.OS === "web") {
      const transacciones = await this.getAll();
      const nueva = {
        id: Date.now(),
        categoria,
        monto,
        dia,
        mes,
        año,
        tipo,
        fecha_creacion: new Date().toISOString(),
      };
      transacciones.unshift(nueva);
      localStorage.setItem(this.storageKey, JSON.stringify(transacciones));
      return nueva;
    } else {
      const result = await this.db.runAsync(
        `INSERT INTO transacciones (categoria, monto, dia, mes, año, tipo)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [categoria, monto, dia, mes, año, tipo]
      );

      return {
        id: result.lastInsertRowId,
        categoria,
        monto,
        dia,
        mes,
        año,
        tipo,
        fecha_creacion: new Date().toISOString(),
      };
    }
  }

  // Actualizar transacción
  async update(id, camposActualizados) {
    const numericId = Number(id);

    if (Platform.OS === "web") {
      const transacciones = await this.getAll();
      const index = transacciones.findIndex((t) => t.id === numericId);
      if (index !== -1) {
        transacciones[index] = { ...transacciones[index], ...camposActualizados };
        localStorage.setItem(this.storageKey, JSON.stringify(transacciones));
        return true;
      }
      return false;
    } else {
      const keys = Object.keys(camposActualizados);
      const values = Object.values(camposActualizados);
      const setClause = keys.map((k) => `${k} = ?`).join(", ");

      const result = await this.db.runAsync(
        `UPDATE transacciones SET ${setClause} WHERE id = ?`,
        [...values, numericId]
      );
      return result.changes > 0;
    }
  }

  // Eliminar transacción
  async remove(id) {
    const numericId = Number(id);

    if (Platform.OS === "web") {
      let transacciones = await this.getAll();
      const initialLength = transacciones.length;
      transacciones = transacciones.filter((t) => t.id !== numericId);
      localStorage.setItem(this.storageKey, JSON.stringify(transacciones));
      return transacciones.length !== initialLength;
    } else {
      const result = await this.db.runAsync(
        "DELETE FROM transacciones WHERE id = ?",
        numericId
      );
      return result.changes > 0;
    }
  }
}

export default new DatabaseService();
