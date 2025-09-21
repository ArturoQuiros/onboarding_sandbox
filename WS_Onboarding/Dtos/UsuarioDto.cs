using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Dtos
{
    public class UsuarioDto
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string AzureAdUserId { get; set; }
        public required string Email { get; set; }
        public int? IdPais { get; set; }
        public int? RoleId { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }

    public class CreateUsuarioDto
    {
        [Required]
        [MaxLength(100)]
        public required string Nombre { get; set; }

        [Required]
        [MaxLength(100)]
        public required string AzureAdUserId { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public required string Email { get; set; }

        public int? IdPais { get; set; }
        public int? RoleId { get; set; }
    }

    public class UpdateUsuarioDto : CreateUsuarioDto
    {
        //Sin atributos extra por el momento
    }
}