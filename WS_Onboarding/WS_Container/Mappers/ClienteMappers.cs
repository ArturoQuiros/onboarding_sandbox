using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WS_Onboarding.Dtos;
using WS_Onboarding.Models;

namespace WS_Onboarding.Mappers
{
    public static class ClienteMappers
    {
        public static ClienteDto ToClienteDto(this Cliente clienteModel)
        {
            return new ClienteDto
            {
                Id = clienteModel.Id,
                Nombre = clienteModel.Nombre,
                Email = clienteModel.Email,
                Telefono = clienteModel.Telefono,
                Direccion = clienteModel.Direccion,
                Fecha_Creacion = clienteModel.Fecha_Creacion,
                Fecha_Modificacion = clienteModel.Fecha_Modificacion,
            };
        }

        public static Cliente ToClienteFromCreateDTO(this CreateClienteDto clienteModel)
        {
            return new Cliente
            {
                Nombre = clienteModel.Nombre,
                Email = clienteModel.Email,
                Telefono = clienteModel.Telefono,
                Direccion = clienteModel.Direccion,
            };
        }
    }
}