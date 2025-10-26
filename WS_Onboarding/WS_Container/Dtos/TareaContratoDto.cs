using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace WS_Onboarding.Dtos
{
    public class TareaContratoDto
    {
        public int Id { get; set; }

        public int Id_Contrato { get; set; }

        public int Id_Tarea { get; set; }

        public int Id_UsuarioResponsable { get; set; }

        public int Id_Estado { get; set; }

        public string? Json_Respuesta { get; set; }
        public string? Observaciones { get; set; }
    }

    public class TareaContratoEsInternoDto : TareaContratoDto
    {
        public required bool EsInterno { get; set; }
    }
    
    public class CreateTareaContratoDto
    {
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
    }

    public class UpdateTareaContratosDto : CreateTareaContratoDto
    {
        //Sin atributos extra por el momento
    }
}