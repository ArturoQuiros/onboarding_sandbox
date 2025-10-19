using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Dtos
{
    public class AllDataDto
    {
        public required IEnumerable<PaisDto> Paises { get; set; }
        public required IEnumerable<RolDto> Roles { get; set; }
        public required IEnumerable<UsuarioExternoDto> UsuariosExternos { get; set; }
        public required IEnumerable<UsuarioInternoDto> UsuariosInternos { get; set; }
        public required IEnumerable<ServicioDto> Servicios { get; set; }
        public required IEnumerable<ClienteDto> Clientes { get; set; }
        public required IEnumerable<ContratoDto> Contratos { get; set; }
        public required IEnumerable<ContratoServicioDto> Contrato_Servicios { get; set; }
    }
}