using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Dtos
{
    public class LoginDataDto
    {
        public required string Token { get; set; }
        public required UsuarioExternoDto UsuariosExternos { get; set; }
    }
}