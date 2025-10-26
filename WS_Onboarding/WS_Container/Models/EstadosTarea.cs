using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Models
{
    public class EstadosTarea
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public required string Nombre { get; set; }

        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }
}