using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WS_Onboarding.Dtos;
using WS_Onboarding.Models;

namespace WS_Onboarding.Mappers
{
    public static class ContratoServicioServcioMappers
    {
        public static ContratoServicioDto ToContratoServicioDto(this ContratoServicio ContratoServicioModel)
        {
            return new ContratoServicioDto
            {
                IdContrato = ContratoServicioModel.IdContrato,
                IdServicio = ContratoServicioModel.IdServicio
            };
        }

        public static ContratoServicio ToContratoServicioFromCreateDTO(this CreateContratoServicioDto ContratoServicioModel)
        {
            return new ContratoServicio
            {
                IdContrato = ContratoServicioModel.IdContrato,
                IdServicio = ContratoServicioModel.IdServicio
            };
        }
    }
}