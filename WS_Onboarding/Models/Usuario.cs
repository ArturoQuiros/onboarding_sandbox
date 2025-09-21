using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        [Required]
        [MaxLength(100)]
        public required string AzureAdUserId { get; set; }

        [Required]
        [MaxLength(255)]
        public required string Email { get; set; }

        public int? IdPais { get; set; }
        public int? RoleId { get; set; }

        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }

        // Navigation
        public Pais? Pais { get; set; }
        public Rol? Rol { get; set; }
        public ICollection<Contrato>? ContratosGestionados { get; set; }
    }
}