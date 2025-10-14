using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Dtos
{
    public class UsuarioExternoDto
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Email { get; set; }
        public string? Contrasena { get; set; }
        public bool? Estado { get; set; }
        public int? Id_Rol { get; set; }
        public int? Id_Cliente { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }

    public class CreateUsuarioOutsideDefaultDto
    {
        [MaxLength(100)]
        public string? Nombre { get; set; }
        [EmailAddress]
        [MaxLength(255)]
        public string? Email { get; set; }
        [MaxLength(255)]
        public string? Contrasena { get; set; }
        public bool? Estado { get; set; }
        public int? Id_Rol { get; set; }
        public int? Id_Cliente { get; set; }
    }

    public class CreateUsuarioOutsideDto : CreateUsuarioOutsideDefaultDto
    {
        [Required]
        [MaxLength(100)]
        public new required string Nombre { get; set; }
        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public new required string Email { get; set; }
    }

    public class UpdateUsuarioOutsideDto : CreateUsuarioOutsideDefaultDto
    {
        //Sin atributos extra por el momento
    }

    public class RegisterUsuarioOutsideDto
    {
        [Required]
        [MaxLength(100)]
        public required string Nombre { get; set; }
        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public required string Email { get; set; }
        [MaxLength(255)]
        public required string Contrasena { get; set; }
        public int? Id_Rol { get; set; }
        public int? Id_Cliente { get; set; }
    }

    public class LoginUsuarioOutsideDto
    {
        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public required string Email { get; set; }
        [MaxLength(255)]
        public required string Contrasena { get; set; }
    }
    public class SelectUsuarioOutsideDtoRol
    {
        [Required]
        public required int Id_Rol { get; set; }
    }

    public class SelectUsuarioOutsideDtoEmail
    {
        [Required]
        public required string Email { get; set; }
    }

    public class UpdateUsuarioOutsideDtoNameEmailRol
    {
        [MaxLength(100)]
        public string? Nombre { get; set; }
        [EmailAddress]
        [MaxLength(255)]
        public string? Email { get; set; }
        public int? Id_Rol { get; set; }
    }

    public class ChangeUsuarioPasswordDto
    {
        public required string ContrasenaVieja { get; set; }
        public required string ContrasenaNueva { get; set; }
    }

    public class ResetUsuarioPasswordDto
    {
        public required string Contrasena { get; set; }
    }

    public class StatusUsuarioOutsideDto
    {
        public required bool Estado { get; set; }
    }
}