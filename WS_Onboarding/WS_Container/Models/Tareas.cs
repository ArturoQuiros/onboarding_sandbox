using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Models
{
    public class Tareas
    {
        public int Id { get; set; }

        [Required]
        public required int Id_Servicio { get; set; }
        
        [Required]
        [MaxLength(100)]
        public required string Nombre { get; set; }

        [Required]
        public required string Descripcion { get; set; }

        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }

        // Navigation
        [ForeignKey("Id_Servicio")]
        public Servicio Servicio { get; set; } = null!;
    }
}