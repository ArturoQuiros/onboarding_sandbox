using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WS_Onboarding.Data;
using WS_Onboarding.Dtos;
using WS_Onboarding.Mappers;
using Microsoft.Identity.Web;
using Microsoft.Graph;
using System.Net.Http.Headers;
using WS_Onboarding.Functions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Kiota.Abstractions.Authentication;

namespace WS_Onboarding.Controllers
{
    [Route("WS_Onboarding/Usuario")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly ApplicatonDBContext _context;
        private readonly ITokenAcquisition _tokenAcquisition;
        private readonly GraphServiceClient _graphClient;
        private readonly AuthService _authService;
        public UsuarioController(AuthService authService, ApplicatonDBContext context, ITokenAcquisition tokenAcquisition, GraphServiceClient graphClient)
        {
            _authService = authService;
            _context = context;
            _tokenAcquisition = tokenAcquisition;
            _graphClient = graphClient;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var Usuarios = _context.Usuarios.ToList()
                    .Select(c => c.ToUsuarioDto());

                return Ok(Usuarios);
            }
            catch (Exception ex)
            {
                var errorDetails = new
                {
                    Message = ex.Message,             // Main error message
                    Type = ex.GetType().Name,         // Type of the exception
                    StackTrace = ex.StackTrace,       // Stack trace (debug info)
                    Inner = ex.InnerException?.Message, // Deeper cause if any
                    Source = ex.Source                // Where the error came from
                };

                return StatusCode(500, $"Error interno del servidor:\n {errorDetails}");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetUsuarioById([FromRoute] int id)
        {
            try
            {
                var UsuarioModel = _context.Usuarios.Find(id);

                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(UsuarioModel.ToUsuarioDto());
                }
            }
            catch (Exception ex)
            {
                var errorDetails = new
                {
                    Message = ex.Message,             // Main error message
                    Type = ex.GetType().Name,         // Type of the exception
                    StackTrace = ex.StackTrace,       // Stack trace (debug info)
                    Inner = ex.InnerException?.Message, // Deeper cause if any
                    Source = ex.Source                // Where the error came from
                };

                return StatusCode(500, $"Error interno del servidor:\n {errorDetails}");
            }
        }

        [HttpGet("ByEmail")]
        public IActionResult GetUsuarioByEmail([FromRoute] string Email)
        {
            try
            {
                var UsuarioModel = _context.Usuarios
                .Where(c => c.Email == Email).ToList()
                .FirstOrDefault();

                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(UsuarioModel.ToUsuarioDto());
                }
            }
            catch (Exception ex)
            {
                var errorDetails = new
                {
                    Message = ex.Message,             // Main error message
                    Type = ex.GetType().Name,         // Type of the exception
                    StackTrace = ex.StackTrace,       // Stack trace (debug info)
                    Inner = ex.InnerException?.Message, // Deeper cause if any
                    Source = ex.Source                // Where the error came from
                };

                return StatusCode(500, $"Error interno del servidor:\n {errorDetails}");
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateUsuarioDto UsuarioDto)
        {
            try
            {
                var UsuarioModel = UsuarioDto.ToUsuarioFromCreateDTO();
                UsuarioModel.Fecha_Creacion = DateTime.UtcNow;
                UsuarioModel.Fecha_Modificacion = DateTime.UtcNow;

                _context.Usuarios.Add(UsuarioModel);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetUsuarioById), new { id = UsuarioModel.Id }, UsuarioModel.ToUsuarioDto());
            }
            catch (Exception ex)
            {
                var errorDetails = new
                {
                    Message = ex.Message,             // Main error message
                    Type = ex.GetType().Name,         // Type of the exception
                    StackTrace = ex.StackTrace,       // Stack trace (debug info)
                    Inner = ex.InnerException?.Message, // Deeper cause if any
                    Source = ex.Source                // Where the error came from
                };

                return StatusCode(500, $"Error interno del servidor:\n {errorDetails}");
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateUsuarioDto UsuarioDto)
        {
            try
            {
                var UsuarioModel = _context.Usuarios.FirstOrDefault(c => c.Id == id);

                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    UsuarioModel.Nombre = UsuarioDto.Nombre;
                    UsuarioModel.Azure_AD_User_Id = UsuarioDto.Azure_AD_User_Id;
                    UsuarioModel.Email = UsuarioDto.Email;
                    UsuarioModel.Fecha_Modificacion = DateTime.UtcNow;
                    UsuarioModel.Estado = (UsuarioDto.Estado == null) ? UsuarioModel.Estado : UsuarioDto.Estado;
                    UsuarioModel.Contrasena = (UsuarioDto.Contrasena == null) ? UsuarioModel.Contrasena : UsuarioDto.Contrasena;
                    _context.SaveChanges();

                    return Ok(UsuarioModel.ToUsuarioDto());
                }
            }
            catch (Exception ex)
            {
                var errorDetails = new
                {
                    Message = ex.Message,             // Main error message
                    Type = ex.GetType().Name,         // Type of the exception
                    StackTrace = ex.StackTrace,       // Stack trace (debug info)
                    Inner = ex.InnerException?.Message, // Deeper cause if any
                    Source = ex.Source                // Where the error came from
                };

                return StatusCode(500, $"Error interno del servidor:\n {errorDetails}");
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Delete([FromRoute] int id)
        {
            try
            {
                var UsuarioModel = _context.Usuarios.FirstOrDefault(c => c.Id == id);

                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    _context.Usuarios.Remove(UsuarioModel);
                    _context.SaveChanges();

                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                var errorDetails = new
                {
                    Message = ex.Message,             // Main error message
                    Type = ex.GetType().Name,         // Type of the exception
                    StackTrace = ex.StackTrace,       // Stack trace (debug info)
                    Inner = ex.InnerException?.Message, // Deeper cause if any
                    Source = ex.Source                // Where the error came from
                };

                return StatusCode(500, $"Error interno del servidor:\n {errorDetails}");
            }
        }

        [HttpPost("RegisterUser")]
        public IActionResult RegisterUser([FromBody] RegisterUsuarioDto UsuarioDto)
        {
            try
            {
                var UsuarioModel = UsuarioDto.ToUsuarioFromRegisterDTO();
                UsuarioModel.Contrasena = _authService.HashPassword(UsuarioDto.Contrasena);

                _context.Usuarios.Add(UsuarioModel);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetUsuarioById), new { id = UsuarioModel.Id }, UsuarioModel.ToUsuarioDto());
                
            }
            catch (Exception ex)
            {
                var errorDetails = new
                {
                    Message = ex.Message,             // Main error message
                    Type = ex.GetType().Name,         // Type of the exception
                    StackTrace = ex.StackTrace,       // Stack trace (debug info)
                    Inner = ex.InnerException?.Message, // Deeper cause if any
                    Source = ex.Source                // Where the error came from
                };

                return StatusCode(500, $"Error interno del servidor:\n {errorDetails}");
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginUsuarioDto LoginDto)
        {
            var UsuarioModel = _context.Usuarios
                .Where(c => c.Email == LoginDto.Email).ToList()
                .FirstOrDefault();

            if (UsuarioModel == null)
            {
                return StatusCode(500, $"No se ha encontrado usuario con email: {LoginDto.Email}\n");
            }
            else if(UsuarioModel.Contrasena == null)
            {
                return StatusCode(500, $"La contraseña guardad: {UsuarioModel.Contrasena} no pueden ser nulo\n");
            }
            else
            {
                if (!_authService.VerifyPassword(LoginDto.Contrasena, UsuarioModel.Contrasena))
                    return Unauthorized("Credenciales inválidas");

                return Ok(new { message = "Autenticado" });
            }
        }

        [HttpGet("GetAzureUsers")]
        [Authorize] // Requiere token de Azure AD
        public async Task<IActionResult> GetAzureUsers()
        {
            try
            {
                var users = await _graphClient.Users.GetAsync(requestConfig =>
                {
                    requestConfig.QueryParameters.Select = new[]
                    {
                        "id", "displayName", "mail", "userPrincipalName"
                    };
                    requestConfig.QueryParameters.Top = 10;
                });

                return Ok(users?.Value?.ToList());
            }
            catch (Exception ex)
            {
                var errorDetails = new
                {
                    Message = ex.Message,
                    Type = ex.GetType().Name,
                    StackTrace = ex.StackTrace,
                    Inner = ex.InnerException?.Message,
                    Source = ex.Source
                };

                return StatusCode(500, errorDetails);
            }
        }
    }
}