// import { passwordResetService } from '../services/passwordResetService.js';
// import { userService } from '../services/usersService.js';
// // Función para enviar un correo electrónico de restablecimiento de contraseña
// export const sendPasswordResetEmail = async (req, res) => {
//     try {
//         const { email } = req.body;
//         const user = await userService.getUserByEmail(email);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         await passwordResetService.sendPasswordResetEmail(user);
//         return res.json({ message: 'Password reset email sent successfully' });
//     } catch (error) {
//         console.error('Error sending password reset email:', error);
//         return res.status(500).json({ error: 'Failed to send password reset email' });
//     }
// };
// // Función para verificar el token de restablecimiento de contraseña y cambiar la contraseña
// export const resetPassword = async (req, res) => {
//     try {
//         const { token, newPassword } = req.body;
//         const user = await passwordResetService.verifyPasswordResetToken(token);

//         if (!user) {
//             return res.status(400).json({ error: 'Invalid or expired token' });
//         }

//         await userService.changePassword(user, newPassword);
//         return res.json({ message: 'Password reset successfully' });
//     } catch (error) {
//         console.error('Error resetting password:', error);
//         return res.status(500).json({ error: 'Failed to reset password' });
//     }
// };
