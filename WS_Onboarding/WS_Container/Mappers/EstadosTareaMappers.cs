using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WS_Onboarding.Dtos;
using WS_Onboarding.Models;

namespace WS_Onboarding.Mappers
{
    public static class EstadosTareaMappers
    {
        public static EstadosTareaDto ToEstadosTareaDto(this EstadosTarea EstadosTareaModel)
        {
            return new EstadosTareaDto
            {
                Id = EstadosTareaModel.Id,
                Nombre = EstadosTareaModel.Nombre,
                Fecha_Creacion = EstadosTareaModel.Fecha_Creacion,
                Fecha_Modificacion = EstadosTareaModel.Fecha_Modificacion,
            };
        }

        public static EstadosTarea ToEstadosTareaFromCreateDTO(this CreateEstadosTareaDto EstadosTareaModel)
        {
            return new EstadosTarea
            {
                Nombre = EstadosTareaModel.Nombre,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };
        }
    }
}