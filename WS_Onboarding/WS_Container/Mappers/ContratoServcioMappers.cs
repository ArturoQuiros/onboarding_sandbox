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
                Id = ContratoServicioModel.Id,
                Id_Contrato = ContratoServicioModel.Id_Contrato,
                Id_Servicio = ContratoServicioModel.Id_Servicio,
                Estado = ContratoServicioModel.Estado,
                Fecha_Creacion = ContratoServicioModel.Fecha_Creacion,
                Fecha_Modificacion = ContratoServicioModel.Fecha_Modificacion,
            };
        }

        public static ContratoServicio ToContratoServicioFromCreateDTO(this CreateContratoServicioDto ContratoServicioModel)
        {
            return new ContratoServicio
            {
                Id_Contrato = ContratoServicioModel.Id_Contrato,
                Id_Servicio = ContratoServicioModel.Id_Servicio,
                Estado = ContratoServicioModel.Estado,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };
        }
    }
}