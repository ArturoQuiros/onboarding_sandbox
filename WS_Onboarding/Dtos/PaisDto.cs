using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Dtos
{
    public class PaisDto
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }

    public class CreatePaisDto
    {
        [Required]
        [MaxLength(20)]
        public required string Nombre { get; set; }
    }

    public class UpdatePaisDto : CreatePaisDto
    {
        //Sin atributos extra por el momento
    }
}