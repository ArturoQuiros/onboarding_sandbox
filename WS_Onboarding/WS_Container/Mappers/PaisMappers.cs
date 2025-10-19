using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WS_Onboarding.Dtos;
using WS_Onboarding.Models;

namespace WS_Onboarding.Mappers
{
    public static class PaisMappers
    {
        public static PaisDto ToPaisDto(this Pais PaisModel)
        {
            return new PaisDto
            {
                Id = PaisModel.Id,
                Nombre = PaisModel.Nombre,
                Fecha_Creacion = PaisModel.Fecha_Creacion,
                Fecha_Modificacion = PaisModel.Fecha_Modificacion,
            };
        }

        public static Pais ToPaisFromCreateDTO(this CreatePaisDto PaisModel)
        {
            return new Pais
            {
                Nombre = PaisModel.Nombre,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };
        }
    }
}