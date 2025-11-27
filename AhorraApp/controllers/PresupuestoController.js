// controllers/PresupuestoController.js
import DatabaseService from "../database/DatabaseService";

export class PresupuestoController {
  constructor() {
    this.listeners = [];
  }

  async initialize() {
    await DatabaseService.initialize();
  }

  async obtenerPresupuestos() {
    const data = await DatabaseService.getAll();
    return data; // Ya vienen bien formateados
  }

  async crearPresupuesto(presupuesto) {
    const { categoria, monto, fecha } = presupuesto;

    if (!categoria || !monto || !fecha) {
      throw new Error("Faltan datos obligatorios");
    }

    const nuevo = await DatabaseService.add(presupuesto);
    this.notifyListeners();
    return nuevo;
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(l => l !== callback);
  }

  notifyListeners() {
    this.listeners.forEach(cb => cb());
  }
}