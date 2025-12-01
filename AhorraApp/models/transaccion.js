// models/transaccion.js

export class Transaccion {
    constructor(id, tipo, categoria, monto, descripcion, fecha) {
        this.id = id;
        this.tipo = tipo; // 'Ingreso' o 'Gasto'
        this.categoria = categoria; 
        this.monto = parseFloat(monto); 
        this.descripcion = descripcion || ''; 
        this.fecha = fecha; // Formato texto: 'DD / MM / YYYY'
    }

    // Validación de datos antes de guardar
    static validar(categoria, monto, fecha) {
        if (!categoria || categoria.trim().length === 0) {
            throw new Error('La categoría es obligatoria.');
        }
        
        const montoNum = parseFloat(monto);
        if (isNaN(montoNum) || montoNum === 0) {
            throw new Error('El monto debe ser un número válido y no puede ser cero.');
        }

        if (!fecha) {
            throw new Error('La fecha es obligatoria.');
        }

        return true;
    }
}