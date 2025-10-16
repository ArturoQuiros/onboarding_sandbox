using System;
using System.Collections.Generic;
using System.Linq;
using WS_Onboarding.Dtos;
using System.Threading.Tasks;
using WS_Onboarding.Models;

namespace WS_Onboarding.Mappers
{
    public static class UsuarioExternoMappers
    {
        public static UsuarioExternoDto ToUsuarioExternoDto(this UsuarioExterno UsuarioModel)
        {
            return new UsuarioExternoDto
            {
                Id = UsuarioModel.Id,
                Nombre = UsuarioModel.Nombre,
                Email = UsuarioModel.Email,
                Estado = UsuarioModel.Estado,
                Id_Rol = UsuarioModel.Id_Rol,
                Id_Cliente = UsuarioModel.Id_Cliente,
                Fecha_Creacion = UsuarioModel.Fecha_Creacion,
                Fecha_Modificacion = UsuarioModel.Fecha_Modificacion,
            };
        }

        public static UsuarioExterno ToUsuarioFromRegisterOutsideDTO(this RegisterUsuarioOutsideDto UsuarioModel)
        {
            return new UsuarioExterno
            {
                Nombre = UsuarioModel.Nombre,
                Email = UsuarioModel.Email,
                Contrasena = UsuarioModel.Contrasena,
                Estado = true,
                Id_Rol = UsuarioModel.Id_Rol,
                Id_Cliente = UsuarioModel.Id_Cliente,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };
        }

        public static UsuarioExterno ToUsuarioFromCreateDTO(this CreateUsuarioOutsideDto UsuarioModel)
        {
            return new UsuarioExterno
            {
                Nombre = UsuarioModel.Nombre,
                Email = UsuarioModel.Email,
                Estado = UsuarioModel.Estado,
                Id_Rol = UsuarioModel.Id_Rol,
                Id_Cliente = UsuarioModel.Id_Cliente,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };
        }
    }
}