using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BCrypt.Net;

namespace WS_Onboarding.Functions
{
    public class AuthService
    {
        // Genera hash (sal y workFactor incluidos en el hash resultante)
        public string HashPassword(string password)
        {
            // workFactor 12 es un buen comienzo (puedes subirlo si tu latencia lo permite)
            return BCrypt.Net.BCrypt.HashPassword(password, workFactor: 12);
        }

        // Verifica contraseña contra hash almacenado
        public bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }
    }
}