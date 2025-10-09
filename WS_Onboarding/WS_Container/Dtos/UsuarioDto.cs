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
        public required string Azure_AD_User_Id { get; set; }
        public required string Email { get; set; }
        public int? Id_Pais { get; set; }
        public int? Role_Id { get; set; }
        public string? Contrasena { get; set; }
        public bool? Estado { get; set; }
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
        public required string Azure_AD_User_Id { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public required string Email { get; set; }

        public int? Id_Pais { get; set; }
        public int? Role_Id { get; set; }
        public bool? Estado { get; set; }
        [MaxLength(255)]
        public string? Contrasena { get; set; }
    }

    public class RegisterUsuarioDto
    {
        [Required]
        [MaxLength(100)]
        public required string Nombre { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public required string Email { get; set; }

        public int? Id_Pais { get; set; }
        public int? Role_Id { get; set; }
        [MaxLength(255)]
        public required string Contrasena { get; set; }
    }

    public class LoginUsuarioDto
    {
        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public required string Email { get; set; }
        [MaxLength(255)]
        public required string Contrasena { get; set; }
    }

    public class UpdateUsuarioDto : CreateUsuarioDto
    {
        //Sin atributos extra por el momento
    }
}