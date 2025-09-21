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
        public int IdContrato { get; set; }
        public int IdServicio { get; set; }
    }

    public class CreateContratoServicioDto
    {
        [Required]
        public int IdContrato { get; set; }

        [Required]
        public int IdServicio { get; set; }
    }

    public class UpdateContratoServicioDto : CreateContratoServicioDto
    {
        // No es necesario
    }
}

