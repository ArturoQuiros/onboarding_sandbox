using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Dtos
{
    public class ContratoDto
    {
        public int Id { get; set; }
        public int? IdCliente { get; set; }
        public required string NumeroContrato { get; set; }
        public required string Estado { get; set; }
        public int? AccountManager { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }

    public class CreateContratoDto
    {
        [Required]
        public int IdCliente { get; set; }

        [Required]
        [MaxLength(50)]
        public required string NumeroContrato { get; set; }

        [MaxLength(20)]
        public required string Estado { get; set; }

        public int? AccountManager { get; set; }
    }

    public class UpdateContratoDto : CreateContratoDto
    {
        //Sin atributos extra por el momento
    }
}