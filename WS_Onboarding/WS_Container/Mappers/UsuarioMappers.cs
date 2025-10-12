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
        public static UsuarioDto ToUsuarioDto(this Usuario UsuarioModel)
        {
            return new UsuarioDto
            {
                Id = UsuarioModel.Id,
                Nombre = UsuarioModel.Nombre,
                Azure_AD_User_Id = UsuarioModel.Azure_AD_User_Id,
                Id_Pais = UsuarioModel.Id_Pais,
                Role_Id = UsuarioModel.Role_Id,
                Email = UsuarioModel.Email,
                Estado = UsuarioModel.Estado,
                Tipo = UsuarioModel.Tipo,
                Fecha_Creacion = UsuarioModel.Fecha_Creacion,
                Fecha_Modificacion = UsuarioModel.Fecha_Modificacion,
            };
        }

        public static Usuario ToUsuarioFromRegisterOutsideDTO(this RegisterUsuarioOutsideDto UsuarioModel)
        {
            return new Usuario
            {
                Nombre = UsuarioModel.Nombre,
                Azure_AD_User_Id = "0",
                Id_Pais = UsuarioModel.Id_Pais,
                Role_Id = UsuarioModel.Role_Id,
                Email = UsuarioModel.Email,
                Contrasena = UsuarioModel.Contrasena,
                Estado = true,
                Tipo = 2,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };
        }

        public static Usuario ToUsuarioFromRegisterAzureDTO(this RegisterUsuarioAzureDto UsuarioModel)
        {
            return new Usuario
            {
                Nombre = UsuarioModel.Nombre,
                Azure_AD_User_Id = "0",
                Id_Pais = UsuarioModel.Id_Pais,
                Role_Id = UsuarioModel.Role_Id,
                Email = UsuarioModel.Email,
                Contrasena = null,
                Estado = true,
                Tipo = 1,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };
        }

        public static Usuario ToUsuarioFromCreateDTO(this CreateUsuarioDto UsuarioModel)
        {
            return new Usuario
            {
                Nombre = UsuarioModel.Nombre,
                Azure_AD_User_Id = UsuarioModel.Azure_AD_User_Id,
                Id_Pais = UsuarioModel.Id_Pais,
                Role_Id = UsuarioModel.Role_Id,
                Email = UsuarioModel.Email,
                Estado = UsuarioModel.Estado,
                Tipo = UsuarioModel.Tipo,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };
        }
    }
}