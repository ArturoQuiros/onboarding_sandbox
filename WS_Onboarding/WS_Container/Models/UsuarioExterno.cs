using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Models
{
    public class UsuarioExterno
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public required string Nombre { get; set; }
        [MaxLength(255)]
        public required string Email { get; set; }
        [MaxLength(255)]
        public string? Contrasena { get; set; }
        public bool? Estado { get; set; }
        [Column("Id_Rol")]
        public int? Id_Rol { get; set; }
        [Column("Id_Cliente")]
        public int? Id_Cliente { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }

        // Navigation
        [ForeignKey("Id_Rol")]
        public Rol? Rol { get; set; }
        [ForeignKey("Id_Cliente")]
        public Cliente? Cliente { get; set; }
    }
}