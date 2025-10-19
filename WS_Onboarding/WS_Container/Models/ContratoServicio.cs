using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Models
{
    public class ContratoServicio
    {
        public int Id { get; set; }
        [Column("Id_Contrato")]
        public int Id_Contrato { get; set; }
        [Column("Id_Servicio")]
        public int Id_Servicio { get; set; }
        public bool? Estado { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }

        // Navigation
        [ForeignKey("Id_Contrato")]
        public Contrato? Contrato { get; set; }
        [ForeignKey("Id_Servicio")]
        public Servicio? Servicio { get; set; }
    }
}