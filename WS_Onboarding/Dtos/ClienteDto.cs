using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Dtos
{
    public class ClienteDto
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Email { get; set; }
        public required string Telefono { get; set; }
        public required string Direccion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }

    public class CreateClienteDto
    {
        [Required]
        [MaxLength(200)]
        public required string Nombre { get; set; }

        [MaxLength(255)]
        [EmailAddress]
        public required string Email { get; set; }

        [MaxLength(50)]
        public required string Telefono { get; set; }

        [MaxLength(255)]
        public required string Direccion { get; set; }
    }

    public class UpdateClienteDto : CreateClienteDto
    {
        //Sin atributos extra por el momento
    }
}