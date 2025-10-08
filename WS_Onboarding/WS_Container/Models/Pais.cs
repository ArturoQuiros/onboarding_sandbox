using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Models
{
    public class Pais
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public required string Nombre { get; set; }

        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }

        // Navigation properties
        public ICollection<Usuario>? Usuarios { get; set; }
        public ICollection<Servicio>? Servicios { get; set; }
    }
}