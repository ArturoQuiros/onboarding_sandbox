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
                IdCliente = ContratoModel.IdCliente,
                NumeroContrato = ContratoModel.NumeroContrato,
                Estado = ContratoModel.Estado,
                AccountManager = ContratoModel.AccountManager,
                Fecha_Creacion = ContratoModel.Fecha_Creacion,
                Fecha_Modificacion = ContratoModel.Fecha_Modificacion,
            };
        }

        public static Contrato ToContratoFromCreateDTO(this CreateContratoDto ContratoModel)
        {
            return new Contrato
            {
                IdCliente = ContratoModel.IdCliente,
                NumeroContrato = ContratoModel.NumeroContrato,
                Estado = ContratoModel.Estado,
                AccountManager = ContratoModel.AccountManager,
            };
        }
    }
}