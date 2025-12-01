// models/usuario.js

export class Usuario {
    constructor(id, nombre, correo, fechaCreacion, password) {
        this.id = id;
        this.nombre = nombre;
        // Agregamos correo y password al constructor para tener la estructura completa
        this.correo = correo; 
        this.password = password; 
        this.fechaCreacion = fechaCreacion || new Date().toISOString();
    }

    // Validaciones del modelo [cite: 67]
    static validarNombre(nombre) {
        if (!nombre || nombre.trim().length === 0) { // [cite: 71, 73]
            throw new Error('El nombre no puede estar vacío');
        }
        if (nombre.length > 50) { // [cite: 77, 79]
            throw new Error('El nombre no puede tener más de 50 caracteres');
        }
        return true; // [cite: 83]
    }
    
    // Agregamos validación para correo
    static validarCorreo(correo) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correo || !emailRegex.test(correo.trim())) {
            throw new Error('Por favor, ingresa un correo electrónico válido.');
        }
        return true;
    }

    // Agregamos validación para password
    static validarPassword(password) {
        if (!password || password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres.');
        }
        return true;
    }

    // Unificamos las validaciones para registro
    static validarRegistro(nombre, correo, password, confirmPassword, aceptaTerminos) {
        Usuario.validarNombre(nombre);
        Usuario.validarCorreo(correo);
        Usuario.validarPassword(password);

        if (password !== confirmPassword) {
            throw new Error('Las contraseñas no coinciden.');
        }
        if (!aceptaTerminos) {
             throw new Error('Debes aceptar los términos y condiciones.');
        }

        return true;
    }
}