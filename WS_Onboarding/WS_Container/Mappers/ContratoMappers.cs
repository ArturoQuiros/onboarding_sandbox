using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WS_Onboarding.Dtos;
using WS_Onboarding.Models;

namespace WS_Onboarding.Mappers
{
    public static class ContratoMappers
    {
        public static ContratoDto ToContratoDto(this Contrato ContratoModel)
        {
            return new ContratoDto
            {
                Id = ContratoModel.Id,
                Id_Cliente = ContratoModel.Id_Cliente,
                Estado = ContratoModel.Estado,
                Account_manager = ContratoModel.Account_manager,
                Fecha_Creacion = ContratoModel.Fecha_Creacion,
                Fecha_Modificacion = ContratoModel.Fecha_Modificacion,
            };
        }

        public static Contrato ToContratoFromCreateDTO(this CreateContratoDto ContratoModel)
        {
            return new Contrato
            {
                Id_Cliente = ContratoModel.Id_Cliente,
                Estado = ContratoModel.Estado,
                Account_manager = ContratoModel.Account_manager,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };
        }
    }
}