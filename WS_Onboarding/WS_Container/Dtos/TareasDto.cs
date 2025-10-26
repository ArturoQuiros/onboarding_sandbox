using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WS_Onboarding.Dtos
{
    public class TareasDto
    {
        public int Id { get; set; }
        public required int Id_Servicio { get; set; }
        public required string Nombre { get; set; }
        public required string Descripcion { get; set; }
        public required bool EsInterno { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }
    }

    public class CreateTareasDto
    {
        [Required]
        public required int Id_Servicio { get; set; }
        [Required]
        [MaxLength(100)]
        public required string Nombre { get; set; }
        [Required]
        public required string Descripcion { get; set; }
        [Required]
        public required bool EsInterno { get; set; }
    }

    public class UpdateTareasDto : CreateTareasDto
    {
        //Sin atributos extra por el momento
    }
}