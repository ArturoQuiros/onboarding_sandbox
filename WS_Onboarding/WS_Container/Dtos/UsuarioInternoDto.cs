using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Dtos
{
    public class UsuarioInternoDto
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Email { get; set; }
        public string? Azure_AD_User_Id { get; set; }
        public string? Puesto { get; set; }
        public bool? Estado { get; set; }
        public int? Id_Rol { get; set; }
        public int? Id_Pais { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }

    public class CreateUsuarioInsideDefaultDto
    {
        [MaxLength(100)]
        public string? Nombre { get; set; }
        [EmailAddress]
        [MaxLength(255)]
        public string? Email { get; set; }
        [MaxLength(100)]
        public string? Azure_AD_User_Id { get; set; }
        public string? Puesto { get; set; }
        public bool? Estado { get; set; }
        public int? Id_Rol { get; set; }
        public int? Id_Pais { get; set; }
    }

    public class CreateUsuarioInsideDto : CreateUsuarioInsideDefaultDto
    {
        [Required]
        [MaxLength(100)]
        public new required string Nombre { get; set; }
        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public new required string Email { get; set; }
    }

    public class UpdateUsuarioInsideDto : CreateUsuarioInsideDefaultDto
    {
        //
    }

    public class RegisterUsuarioInsideDto
    {
        [Required]
        [MaxLength(100)]
        public required string Nombre { get; set; }
        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public required string Email { get; set; }
        [MaxLength(100)]
        public string? Azure_AD_User_Id { get; set; }
        public string? Puesto { get; set; }
        public int? Id_Rol { get; set; }
        public int? Id_Pais { get; set; }
    }

    public class LoginUsuarioInsideDto
    {
        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public required string Email { get; set; }
    }

    public class SelectUsuarioInsideDtoRol
    {
        [Required]
        public required int Id_Rol { get; set; }
    }

    public class SelectUsuarioInsideDtoEmail
    {
        [Required]
        public required string Email { get; set; }
    }

    public class UpdateUsuarioInsideDtoRol
    {
        public int? Id_Rol { get; set; }
    }

    public class StatusUsuarioInsideDto 
    {
        public required bool Estado { get; set; }
    }
}