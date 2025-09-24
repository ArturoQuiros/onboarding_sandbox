using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WS_Onboarding.Dtos;
using WS_Onboarding.Models;

namespace WS_Onboarding.Mappers
{
    public static class ServicioMappers
    {
        public static ServicioDto ToServicioDto(this Servicio ServicioModel)
        {
            return new ServicioDto
            {
                Id = ServicioModel.Id,
                Id_pais = ServicioModel.Id_pais,
                Nombre = ServicioModel.Nombre,
                Fecha_Creacion = ServicioModel.Fecha_Creacion,
                Fecha_Modificacion = ServicioModel.Fecha_Modificacion,
            };
        }

        public static Servicio ToServicioFromCreateDTO(this CreateServicioDto ServicioModel)
        {
            return new Servicio
            {
                Nombre = ServicioModel.Nombre
            };
        }
    }
}