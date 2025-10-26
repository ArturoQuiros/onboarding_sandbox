using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Models
{
    public class Cliente
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public required string Nombre { get; set; }

        [MaxLength(255)]
        public required string Email { get; set; }

        [MaxLength(50)]
        public required string Telefono { get; set; }

        [MaxLength(255)]
        public required string Direccion { get; set; }

        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }

        // Navigation
        public ICollection<Contrato> Contratos { get; set; } = new List<Contrato>();
        public ICollection<UsuarioExterno> UsuariosExternos  { get; set; } = new List<UsuarioExterno>();
    }
}