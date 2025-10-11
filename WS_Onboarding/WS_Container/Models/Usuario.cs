using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public required string Nombre { get; set; }

        [MaxLength(100)]
        public string? Azure_AD_User_Id { get; set; }

        [Required]
        [MaxLength(255)]
        public required string Email { get; set; }
        [Column("Id_Pais")]
        public int? Id_Pais { get; set; }
        [Column("Role_Id")]
        public int? Role_Id { get; set; }
        [MaxLength(255)]
        public string? Contrasena { get; set; }
        public bool? Estado { get; set; }

        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }

        // Navigation
        [ForeignKey("Id_Pais")]
        public Pais? Pais { get; set; }
        [ForeignKey("Role_Id")]
        public Rol? Rol { get; set; }
        public ICollection<Contrato>? ContratosGestionados { get; set; }
    }
}