using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WS_Onboarding.Dtos;
using WS_Onboarding.Models;

namespace WS_Onboarding.Mappers
{
    public static class UsuarioMappers
    {
        public static UsuarioInternoDto ToUsuarioInteriorDto(this UsuarioInterno UsuarioModel)
        {
            return new UsuarioInternoDto
            {
                Id = UsuarioModel.Id,
                Nombre = UsuarioModel.Nombre,
                Email = UsuarioModel.Email,
                Azure_AD_User_Id = UsuarioModel.Azure_AD_User_Id,
                Puesto = UsuarioModel.Puesto,
                Estado = UsuarioModel.Estado,
                Id_Rol = UsuarioModel.Id_Rol,
                Id_Pais = UsuarioModel.Id_Pais,
                Fecha_Creacion = UsuarioModel.Fecha_Creacion,
                Fecha_Modificacion = UsuarioModel.Fecha_Modificacion,
            };
        }

        public static UsuarioInterno ToUsuarioFromRegisterInsideDTO(this RegisterUsuarioInsideDto UsuarioModel)
        {
            return new UsuarioInterno
            {
                Nombre = UsuarioModel.Nombre,
                Email = UsuarioModel.Email,
                Azure_AD_User_Id = UsuarioModel.Azure_AD_User_Id,
                Puesto = UsuarioModel.Puesto,
                Estado = true,
                Id_Pais = UsuarioModel.Id_Pais,
                Id_Rol = UsuarioModel.Id_Rol,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };
        }

        public static UsuarioInterno ToUsuarioInsideFromCreateDTO(this CreateUsuarioInsideDto UsuarioModel)
        {
            return new UsuarioInterno
            {
                Nombre = UsuarioModel.Nombre,
                Email = UsuarioModel.Email,
                Azure_AD_User_Id = UsuarioModel.Azure_AD_User_Id,
                Puesto = UsuarioModel.Puesto,
                Estado = UsuarioModel.Estado,
                Id_Pais = UsuarioModel.Id_Pais,
                Id_Rol = UsuarioModel.Id_Rol,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };
        }
    }
}