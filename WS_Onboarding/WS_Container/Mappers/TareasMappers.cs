using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WS_Onboarding.Dtos;
using WS_Onboarding.Models;

namespace WS_Onboarding.Mappers
{
    public static class TareasMappers
    {
        public static TareasDto ToTareaDto(this Tareas TareaModel)
        {
            return new TareasDto
            {
                Id = TareaModel.Id,
                Id_Servicio = TareaModel.Id_Servicio,
                Nombre = TareaModel.Nombre,
                Descripcion = TareaModel.Descripcion,
                EsInterno = TareaModel.EsInterno,
                Fecha_Creacion = TareaModel.Fecha_Creacion,
                Fecha_Modificacion = TareaModel.Fecha_Modificacion,
            };
        }

        public static Tareas ToTareaFromCreateDTO(this CreateTareasDto TareaModel)
        {
            return new Tareas
            {
                Id_Servicio = TareaModel.Id_Servicio,
                Nombre = TareaModel.Nombre,
                Descripcion = TareaModel.Descripcion,
                EsInterno = TareaModel.EsInterno,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };
        }
    }
}