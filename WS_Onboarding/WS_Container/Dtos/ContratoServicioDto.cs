using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Dtos
{
    public class ContratoServicioDto
    {
        public int Id { get; set; }
        public int Id_Contrato { get; set; }
        public int Id_Servicio { get; set; }
        public bool? Estado { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }

    public class CreateContratoServicioDto
    {
        [Required]
        public int Id_Contrato { get; set; }
        [Required]
        public int Id_Servicio { get; set; }
        public bool? Estado { get; set; }
    }

    public class UpdateContratoServicioDto : CreateContratoServicioDto
    {
        // No es necesario
    }
}

