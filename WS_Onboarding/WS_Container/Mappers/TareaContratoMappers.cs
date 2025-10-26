using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WS_Onboarding.Dtos;
using WS_Onboarding.Models;

namespace WS_Onboarding.Mappers
{
    public static class TareaContratoMappers
    {
        public static TareaContratoDto ToTareaContratoFullDto(this TareaContrato TareaContratoModel)
        {
            return new TareaContratoDto
            {
                Id = TareaContratoModel.Id,
                Id_Contrato = TareaContratoModel.Id_Contrato,
                Id_Tarea = TareaContratoModel.Id_Tarea,
                Id_UsuarioResponsable = TareaContratoModel.Id_UsuarioResponsable,
                Id_Estado = TareaContratoModel.Id_Estado,
                Json_Respuesta = TareaContratoModel.Json_Respuesta,
                Observaciones = TareaContratoModel.Observaciones,
            };
        }

        public static TareaContratoDto ToTareaContratoSimpleDto(this TareaContrato TareaContratoModel)
        {
            return new TareaContratoDto
            {
                Id = TareaContratoModel.Id,
                Id_Contrato = TareaContratoModel.Id_Contrato,
                Id_Tarea = TareaContratoModel.Id_Tarea,
                Id_UsuarioResponsable = TareaContratoModel.Id_UsuarioResponsable,
                Id_Estado = TareaContratoModel.Id_Estado,
                Json_Respuesta = null,
                Observaciones = TareaContratoModel.Observaciones,
            };
        }

        public static TareaContrato ToTareaContratoFromCreateDTO(this CreateTareaContratoDto TareaContratoModel)
        {
            return new TareaContrato
            {
                Id_Contrato = TareaContratoModel.Id_Contrato,
                Id_Tarea = TareaContratoModel.Id_Tarea,
                Id_UsuarioResponsable = TareaContratoModel.Id_UsuarioResponsable,
                Id_Estado = TareaContratoModel.Id_Estado,
                Json_Respuesta = TareaContratoModel.Json_Respuesta,
                Observaciones = TareaContratoModel.Observaciones,
            };
        }
    }
}