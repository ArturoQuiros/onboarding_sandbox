using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        [Column("Id_pais")]
        public int? Id_pais { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }

        // Navigation
        [ForeignKey("Id_pais")]
        public Pais Pais { get; set; } = null!;
        public ICollection<ContratoServicio> ContratoServicios { get; set; } = new List<ContratoServicio>();
    }
}