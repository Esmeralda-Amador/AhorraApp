import { Transaccion } from '../models/transaccion';
import DatabaseService from '../database/DatabaseService';

export class TransaccionController {
    constructor() {
        this.listeners = [];
    }

    async inicializar() {
        await DatabaseService.initialize();
    }
    
    // --- LECTURA ---

    async obtenerTodas() {
        try {
            const data = await DatabaseService.getAllTransacciones();
            return data.map(t => new Transaccion(t.id, t.tipo, t.categoria, t.monto, t.descripcion, t.fecha));
        } catch (error) {
            console.error('Error al obtener transacciones:', error);
            return [];
        }
    }

    // NUEVO: Obtener solo las últimas 3 para el Panel Principal
    async obtenerRecientes() {
        const todas = await this.obtenerTodas();
        // Como la consulta SQL ya ordena por fecha DESC, solo tomamos las primeras 3
        return todas.slice(0, 3);
    }

    // NUEVO: Calcular el Saldo Total (Ingresos - Gastos)
    async obtenerSaldoTotal() {
        const todas = await this.obtenerTodas();
        let saldo = 0;
        todas.forEach(t => {
            if (t.tipo === 'Ingreso') {
                saldo += t.monto; // Sumar
            } else {
                saldo -= Math.abs(t.monto); // Restar (asegurando que restamos positivo)
            }
        });
        return saldo.toFixed(2);
    }

    // Para las Gráficas
    async obtenerBalance() {
        const todas = await this.obtenerTodas();
        
        const totalIngresos = todas
            .filter(t => t.tipo === 'Ingreso')
            .reduce((acc, curr) => acc + curr.monto, 0);
            
        const totalGastos = todas
            .filter(t => t.tipo === 'Gasto')
            .reduce((acc, curr) => acc + Math.abs(curr.monto), 0);

        return {
            ingresos: totalIngresos,
            gastos: totalGastos,
            transacciones: todas
        };
    }

    // --- ESCRITURA ---

    async agregar(tipo, categoria, monto, descripcion, dia, mes, ano) {
        const fechaFormateada = `${dia} / ${mes} / ${ano}`;
        Transaccion.validar(categoria, monto, fechaFormateada);

        let montoFinal = parseFloat(monto);
        // Normalizar signo
        if (tipo === 'Gasto') montoFinal = -Math.abs(montoFinal);
        if (tipo === 'Ingreso') montoFinal = Math.abs(montoFinal);

        await DatabaseService.addTransaccion(
            tipo, 
            categoria.trim(), 
            montoFinal, 
            descripcion ? descripcion.trim() : '', 
            fechaFormateada
        );
        
        this.notifyListeners();
        return true;
    }

    async actualizar(id, tipo, categoria, monto, descripcion, dia, mes, ano) {
        const fechaFormateada = `${dia} / ${mes} / ${ano}`;
        Transaccion.validar(categoria, monto, fechaFormateada);
        
        let montoFinal = parseFloat(monto);
        if (tipo === 'Gasto') montoFinal = -Math.abs(montoFinal);
        if (tipo === 'Ingreso') montoFinal = Math.abs(montoFinal);

        const success = await DatabaseService.updateTransaccion(
            id, 
            tipo, 
            categoria.trim(), 
            montoFinal, 
            descripcion ? descripcion.trim() : '', 
            fechaFormateada
        );

        if (success) this.notifyListeners();
        return success;
    }

    async eliminar(id) {
        const success = await DatabaseService.deleteTransaccion(id);
        if (success) this.notifyListeners();
        return success;
    }
    // ... métodos anteriores ...
     // Dentro de controllers/TransaccionController.js, antes de los observadores

    async obtenerDatosPorCategoriaFiltrado(search = '') {
        const todas = await this.obtenerTodas();
        const searchLower = search.toLowerCase();
        const categorias = {};

        todas.forEach(t => {
            // 1. Filtrar por tipo (solo gastos nos interesan para el desglose)
            // 2. Filtrar si la categoría contiene el texto de búsqueda
            if (t.tipo === 'Gasto' && (searchLower === '' || t.categoria.toLowerCase().includes(searchLower))) {
                if (!categorias[t.categoria]) {
                    categorias[t.categoria] = 0;
                }
                categorias[t.categoria] += Math.abs(t.monto);
            }
        });

        // Convertir a formato para gráfica (Top 5)
        const datosGrafica = Object.keys(categorias)
            .map(cat => ({
                categoria: cat,
                monto: categorias[cat]
            }))
            .sort((a, b) => b.monto - a.monto)
            .slice(0, 5);

        return {
            labels: datosGrafica.map(d => d.categoria),
            datasets: [{
                data: datosGrafica.map(d => d.monto)
            }]
        };
    }
    // NUEVO: Obtener datos agrupados por categoría para las gráficas
    async obtenerDatosPorCategoria() {
        const todas = await this.obtenerTodas();
        const categorias = {};

        todas.forEach(t => {
            // Solo nos interesan los GASTOS para ver en qué se va el dinero
            if (t.tipo === 'Gasto') {
                if (!categorias[t.categoria]) {
                    categorias[t.categoria] = 0;
                }
                categorias[t.categoria] += Math.abs(t.monto);
            }
        });

        // Convertir a formato para gráfica (Array de objetos)
        // Ordenamos de mayor gasto a menor y tomamos el top 5
        const datosGrafica = Object.keys(categorias)
            .map(cat => ({
                categoria: cat,
                monto: categorias[cat]
            }))
            .sort((a, b) => b.monto - a.monto)
            .slice(0, 5); // Top 5 categorías

        return {
            labels: datosGrafica.map(d => d.categoria),
            datasets: [{
                data: datosGrafica.map(d => d.monto)
            }]
        };
    }

    // --- OBSERVADORES ---
    addListener(callback) { this.listeners.push(callback); }
    removeListener(callback) { this.listeners = this.listeners.filter(l => l !== callback); }
    notifyListeners() { this.listeners.forEach(callback => callback()); }
}

export const transaccionController = new TransaccionController();