using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Models
{
    public class TareaContrato
    {
        public int Id { get; set; }
        
        [Required]
        public int Id_Contrato { get; set; }

        [Required]
        public int Id_Tarea { get; set; }

        [Required]
        public int Id_UsuarioResponsable { get; set; }

        [Required]
        public int Id_Estado { get; set; }

        public string? Json_Respuesta { get; set; }
        public string? Observaciones { get; set; }

        // Navigation
        [ForeignKey("Id_Contrato")]
        public Contrato Contrato { get; set; } = null!;

        [ForeignKey("Id_Tarea")]
        public Tareas Tarea { get; set; } = null!;

        [ForeignKey("Id_UsuarioResponsable")]
        public UsuarioInterno UsuarioInterno { get; set; } = null!;

        [ForeignKey("Id_Estado")]
        public EstadosTarea EstadoTarea { get; set; } = null!;
    }
}