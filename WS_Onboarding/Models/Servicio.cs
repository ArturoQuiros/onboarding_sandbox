using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Models
{
    public class Servicio
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public required string Nombre { get; set; }

        public int? IdPais { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }

        // Navigation
        public Pais? Pais { get; set; }
        public ICollection<ContratoServicio>? ContratoServicios { get; set; }
    }
}