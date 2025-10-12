using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WS_Onboarding.Dtos;
using WS_Onboarding.Models;

namespace WS_Onboarding.Mappers
{
    public static class RolMappers
    {
        public static RolDto ToRolDto(this Rol RolModel)
        {
            return new RolDto
            {
                Id = RolModel.Id,
                Nombre = RolModel.Nombre,
                Fecha_Creacion = RolModel.Fecha_Creacion,
                Fecha_Modificacion = RolModel.Fecha_Modificacion,
            };
        }

        public static Rol ToRolFromCreateDTO(this CreateRolDto RolModel)
        {
            return new Rol
            {
                Nombre = RolModel.Nombre,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };
        }
    }
}