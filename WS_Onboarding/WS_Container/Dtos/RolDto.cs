using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Dtos
{
    public class RolDto
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }

    public class CreateRolDto
    {
        [Required]
        [MaxLength(50)]
        public required string Nombre { get; set; }
    }

    public class UpdateRolDto : CreateRolDto
    {
        //Sin atributos extra por el momento
    }
}