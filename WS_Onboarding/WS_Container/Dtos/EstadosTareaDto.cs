using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace WS_Onboarding.Dtos
{
    public class EstadosTareaDto
    {
        public required int Id { get; set; }
        public required string Nombre { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }

    public class CreateEstadosTareaDto
    {
        [Required]
        public required int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public required string Nombre { get; set; }
    }

    public class UpdateEstadosTareaDto : CreateEstadosTareaDto
    {
        //Sin atributos extra por el momento
    }
}