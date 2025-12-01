import { Usuario } from '../models/usuario'; 
import DatabaseService from '../database/DatabaseService'; 

export class UsuarioController {
    constructor() { 
        this.listeners = []; 
        this.usuarioLogueado = null; 
    }

    async initialize() {
        await DatabaseService.initialize(); 
    }

    // --- LOGIN ---
    async login(correo, password) {
        Usuario.validarCorreo(correo);
        if (!password) throw new Error("Falta la contraseña");

        const usuarioEncontrado = await DatabaseService.getByCorreo(correo.trim());

        if (!usuarioEncontrado) {
            throw new Error('Usuario o contraseña incorrectos.');
        }
        
        if (usuarioEncontrado.password !== password.trim()) {
            throw new Error('Usuario o contraseña incorrectos.');
        }

        // GUARDAR SESIÓN
        this.usuarioLogueado = new Usuario(
            usuarioEncontrado.id, 
            usuarioEncontrado.nombre, 
            usuarioEncontrado.correo, 
            usuarioEncontrado.fecha_creacion,
            usuarioEncontrado.password
        );

        return this.usuarioLogueado;
    }
    
    // --- REGISTRO CORREGIDO ---
    async registrar(nombre, correo, password, confirmPassword, respuestaSeguridad, aceptaTerminos) {
        Usuario.validarRegistro(nombre, correo, password, confirmPassword, aceptaTerminos);
        
        if (!respuestaSeguridad || respuestaSeguridad.trim().length === 0) {
            throw new Error('La pregunta de seguridad es obligatoria.');
        }

        const usuarioExistente = await DatabaseService.getByCorreo(correo.trim());
        if (usuarioExistente) {
            throw new Error('El correo electrónico ya está registrado.');
        }
        
        const respuestaLimpia = respuestaSeguridad.trim().toLowerCase();
        
        const nuevoUsuarioDB = await DatabaseService.add(
            nombre.trim(), 
            correo.trim(), 
            password.trim(), 
            respuestaLimpia
        );
        
        // CREAR OBJETO USUARIO
        const usuarioCreado = new Usuario(
            nuevoUsuarioDB.id, 
            nuevoUsuarioDB.nombre, 
            nuevoUsuarioDB.correo, 
            nuevoUsuarioDB.fecha_creacion,
            nuevoUsuarioDB.password
        );

        // --- ¡ESTA ES LA LÍNEA QUE FALTABA! ---
        // Guardamos al usuario registrado como "Logueado" inmediatamente
        this.usuarioLogueado = usuarioCreado; 
        // --------------------------------------
        
        this.notifyListeners();
        
        return usuarioCreado;
    }
    
    // --- RECUPERACIÓN ---
    async verificarSeguridad(correo, respuestaIntento) {
        const usuario = await DatabaseService.getByCorreo(correo.trim());
        if (!usuario) throw new Error('Correo no encontrado.');

        const respuestaCorrecta = usuario.respuesta_seguridad ? usuario.respuesta_seguridad.toLowerCase() : '';
        const respuestaUsuario = respuestaIntento.trim().toLowerCase();

        if (respuestaCorrecta !== respuestaUsuario) {
            throw new Error('La respuesta de seguridad es incorrecta.');
        }
        return usuario.id; 
    }

    async restablecerContrasena(id, nuevaPassword) {
        Usuario.validarPassword(nuevaPassword);
        const success = await DatabaseService.updatePassword(id, nuevaPassword);
        return success;
    }
    
    // --- PERFIL ---
    async actualizarPerfil(id, nombre, correo) {
        Usuario.validarNombre(nombre);
        Usuario.validarCorreo(correo);
        const success = await DatabaseService.update(id, nombre.trim(), correo.trim());
        
        if (success && this.usuarioLogueado && this.usuarioLogueado.id === id) {
            this.usuarioLogueado.nombre = nombre.trim();
            this.usuarioLogueado.correo = correo.trim();
            this.notifyListeners();
        }
        return success;
    }

    async actualizarContrasena(id, oldPassword, newPassword) {
        if (!this.usuarioLogueado || this.usuarioLogueado.id !== id) {
            throw new Error('Sesión no válida.');
        }
        if (this.usuarioLogueado.password !== oldPassword) {
            throw new Error('La contraseña actual es incorrecta.');
        }
        if (oldPassword === newPassword) {
            throw new Error('La nueva contraseña no puede ser igual a la actual.');
        }
        Usuario.validarPassword(newPassword);

        const success = await DatabaseService.updatePassword(id, newPassword);

        if (success) {
            this.usuarioLogueado.password = newPassword;
            this.notifyListeners();
        }
        return success;
    }

    addListener(callback) { this.listeners.push(callback); }
    removeListener(callback) { this.listeners = this.listeners.filter(l => l !== callback); }
    notifyListeners() { this.listeners.forEach(callback => callback()); }
}

export const usuarioController = new UsuarioController();