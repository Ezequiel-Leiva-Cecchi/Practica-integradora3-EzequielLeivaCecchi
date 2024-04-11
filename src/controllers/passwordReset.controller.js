import * as passwordResetService from '../services/passwordResetService.js';
import { usersDAO } from '../dao/users/indexUsers.js';

// Función para enviar un correo electrónico de restablecimiento de contraseña
export const sendPasswordResetEmail = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Validar que el correo electrónico sea proporcionado
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        console.log("Email provided:", email); // Agregamos esta línea para verificar el correo electrónico proporcionado

        const user = await usersDAO.getUserByEmail(email);

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Enviar correo electrónico de restablecimiento de contraseña
        await passwordResetService.sendPasswordResetEmail(user);

        return res.json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return res.status(500).json({ error: 'Failed to send password reset email' });
    }
};


// Función para verificar el token de restablecimiento de contraseña y cambiar la contraseña
export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Validar que se proporcionen el token y la nueva contraseña
        if (!token || !newPassword) {
            return res.status(400).json({ error: 'Token and newPassword are required' });
        }

        // Verificar el token de restablecimiento de contraseña
        const user = await passwordResetService.verifyPasswordResetToken(token);

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        // Cambiar la contraseña del usuario
        await usersDAO.changePassword(user, newPassword);

        return res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ error: 'Failed to reset password' });
    }
};
