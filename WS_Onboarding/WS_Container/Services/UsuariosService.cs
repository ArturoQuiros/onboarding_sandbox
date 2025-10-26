using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Graph;
using Microsoft.Graph.Models.ODataErrors;
using WS_Onboarding.Data;
using WS_Onboarding.Dtos;
using WS_Onboarding.Mappers;

namespace WS_Onboarding.Services
{
    public interface IUsuariosService
    {
        Task<int> SyncUserADtoDBAsync();
    }
    public class UsuariosService : IUsuariosService
    {
        private readonly ApplicatonDBContext _context;
        private readonly GraphServiceClient _graphClient;

        public UsuariosService(ApplicatonDBContext context, GraphServiceClient graphClient)
        {
            _context = context;
            _graphClient = graphClient;
        }

        public async Task<int> SyncUserADtoDBAsync()
        {
            var UsuariosInternos = _context.UsuariosInternos
                .Where(c => c.Estado == true).ToList()
                .Select(c => c.ToUsuarioInteriorDto());
            try
            {
                var UsersAzureAD = await _graphClient.Users.GetAsync(requestConfig =>
                {
                    requestConfig.QueryParameters.Select = new[]
                    {
                        "id", "displayName", "mail", "userPrincipalName","jobTitle","country","employeeType"
                    };
                    requestConfig.QueryParameters.Top = 10;
                });

                var AzureIdFromUsuarios = UsuariosInternos
                    .Select(u => u.Azure_AD_User_Id).ToHashSet();

                if(UsersAzureAD != null && UsersAzureAD.Value != null)
                {
                    foreach (var User in UsersAzureAD.Value)
                    {
                        Console.WriteLine($"ID: {User.Id}");
                        Console.WriteLine($"Country: {User.Country}");
                        Console.WriteLine($"EmployeeType: {User.EmployeeType}");
                        if (User.DisplayName != null && User.JobTitle != null &&
                            User.Id != null && User.Mail != null &&
                            User.Country != null && User.EmployeeType != null)
                        {
                            if (!AzureIdFromUsuarios.Contains(User.Id))
                            {
                                var UsuarioInterno = new Models.UsuarioInterno
                                {
                                    Nombre = User.DisplayName,
                                    Azure_AD_User_Id = User.Id,
                                    Email = User.Mail,
                                    Id_Pais = int.TryParse(User.Country?.ToString(), out var country) ? country : null,
                                    Id_Rol = int.TryParse(User.EmployeeType?.ToString(), out var employeeType) ? employeeType : null,
                                    Puesto = User.JobTitle,
                                    Estado = true,
                                    Fecha_Creacion = DateTime.UtcNow,
                                    Fecha_Modificacion = DateTime.UtcNow
                                };

                                _context.UsuariosInternos.Add(UsuarioInterno);
                                _context.SaveChanges();
                            }
                            else
                            {
                                var UsuarioModel = _context.UsuariosInternos.FirstOrDefault(c => c.Azure_AD_User_Id == User.Id);

                                if (UsuarioModel != null)
                                {
                                    UsuarioModel.Nombre = User.DisplayName;
                                    UsuarioModel.Email = User.Mail;
                                    UsuarioModel.Puesto = User.JobTitle;
                                    UsuarioModel.Estado = true;
                                    UsuarioModel.Id_Rol = int.TryParse(User.EmployeeType?.ToString(), out var employeeType) ? employeeType : null;
                                    UsuarioModel.Id_Pais = int.TryParse(User.Country?.ToString(), out var country) ? country : null;
                                    UsuarioModel.Fecha_Modificacion = DateTime.UtcNow;
                                    _context.SaveChanges();
                                }
                            }
                        }
                        else
                        {
                            Console.WriteLine("Al usuario de azure le faltan datos");
                        }
                    }
                    return 0;//actualizacion correcta
                }
                else
                {
                    return 1; //Error al extraer datos de usuarios de azure
                }
            }
            catch (Microsoft.Graph.Models.ODataErrors.ODataError odataEx)
            {
                Console.WriteLine($"Graph OData error: {odataEx.Error?.Message}");
                Console.WriteLine($"Error code: {odataEx.Error?.Code}");
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error general: {ex.Message}");
                throw;
            }
        }
    } 
}