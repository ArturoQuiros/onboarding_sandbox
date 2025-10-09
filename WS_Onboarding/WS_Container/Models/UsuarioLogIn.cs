using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Models
{
    public class UsuarioLogIn
    {
        public required string Username { get; set; }
        public string? Password { get; set; }
        public string? Token { get; set; }
    }
}