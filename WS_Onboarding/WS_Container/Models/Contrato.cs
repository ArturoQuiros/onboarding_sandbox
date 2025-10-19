using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Models
{
    public class Contrato
    {
        public int Id { get; set; }
        [Column("Id_Cliente")]
        public int? Id_Cliente { get; set; }

        [MaxLength(20)]
        public required string Estado { get; set; }
        [Column("Account_manager")]
        public int? Account_manager { get; set; }
        [Column("Id_Pais")]
        public int? Id_Pais { get; set; }

        public DateTime? Fecha_Creacion { get; set; }
        public DateTime? Fecha_Modificacion { get; set; }

        // Navigation
        [ForeignKey("Id_Cliente")]
        public Cliente? Cliente { get; set; }
        [ForeignKey("Id_Pais")]
        public Pais? Pais { get; set; }
        [ForeignKey("Account_manager")]
        public UsuarioInterno? UsuarioAccountManager { get; set; }
        public ICollection<ContratoServicio>? ContratoServicios { get; set; }
    }
}