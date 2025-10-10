using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Dtos
{
    public class ServicioDto
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public int? Id_pais { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }

    public class CreateServicioDto
    {
        [Required]
        [MaxLength(50)]
        public required string Nombre { get; set; }

        public int? Id_pais { get; set; }
    }

    public class UpdateServicioDto : CreateServicioDto
    {
        //Sin atributos extra por el momento
    }
}