using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Dtos
{
    public class ContratoDto
    {
        public int Id { get; set; }
        public int? Id_Cliente { get; set; }
        public required string Estado { get; set; }
        public int? Account_manager { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }

    public class CreateContratoDto
    {
        [Required]
        public int Id_Cliente { get; set; }

        [MaxLength(20)]
        public required string Estado { get; set; }

        public int? Account_manager { get; set; }
    }

    public class UpdateContratoDto : CreateContratoDto
    {
        //Sin atributos extra por el momento
    }
}