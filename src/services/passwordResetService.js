import jwt from 'jsonwebtoken';

const secretKey = process.env.SESSION_SECRET; // Clave secreta para firmar y verificar los tokens

// Función para generar un token de restablecimiento de contraseña
const generateResetToken = (userId) => {
    const payload = {
        userId: userId,

    };

    // Genera el token con una expiración de 1 hora
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    return token;
};

// Función para verificar un token de restablecimiento de contraseña
const verifyResetToken = (token) => {
    try {
        // Verifica y decodifica el token
        const decoded = jwt.verify(token, secretKey);
        return decoded.userId; 
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

export { generateResetToken, verifyResetToken };
