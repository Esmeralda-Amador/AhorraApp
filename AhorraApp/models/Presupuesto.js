

export class Presupuesto {
  constructor(id, categoria, monto, fecha, fechaCreacion = null) {
    this.id = id;
    this.categoria = categoria?.trim() || '';
    this.monto = parseFloat(monto) || 0;
    this.fecha = fecha;                    
  }

  getFechaFormateada() {
    if (!this.fecha) return 'Sin fecha';
    if (this.fecha.includes('/')) {
      return this.fecha;
    }
    const date = new Date(this.fecha);
    return date.toLocaleDateString('es-ES');
  }

  static validar({ categoria, monto, fecha }) {
    if (!categoria || categoria.trim().length < 2) {
      throw new Error('La categoría es obligatoria y debe tener al menos 2 caracteres');
    }
    if (!monto || isNaN(monto) || monto <= 0) {
      throw new Error('El monto debe ser un número mayor a 0');
    }
    if (!fecha || fecha.trim() === '') {
      throw new Error('La fecha es obligatoria');
    }
  }

  toJSON() {
    return {
      id: this.id,
      categoria: this.categoria,
      monto: this.monto,
      fecha: this.fecha,
      fechaCreacion: this.fechaCreacion
    };
  }
}