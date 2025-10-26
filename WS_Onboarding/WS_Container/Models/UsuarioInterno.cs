using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Models
{
    public class UsuarioInterno
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public required string Nombre { get; set; }
        [MaxLength(255)]
        public string? Email { get; set; }
        [Required]
        [MaxLength(100)]
        public required string Azure_AD_User_Id { get; set; }
        [MaxLength(100)]
        public string? Puesto { get; set; }
        public bool? Estado { get; set; }
        [Column("Id_Pais")]
        public int? Id_Pais { get; set; }
        [Column("Id_Rol")]
        public int? Id_Rol { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }

        // Navigation
        [ForeignKey("Id_Pais")]
        public Pais Pais { get; set; } = null!;
        [ForeignKey("Id_Rol")]
        public Rol Rol { get; set; } = null!;
        public ICollection<Contrato> ContratosGestionados { get; set; } = new List<Contrato>();
    }
}