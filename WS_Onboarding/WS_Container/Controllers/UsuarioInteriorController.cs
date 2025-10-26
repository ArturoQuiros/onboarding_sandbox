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
using WS_Onboarding.Services;

namespace WS_Onboarding.Controllers
{
    [Route("WS_Onboarding/User/Inside")]
    [ApiController]
    public class UsuarioInteriorController : ControllerBase
    {
        private readonly ApplicatonDBContext _context;
        private readonly ITokenAcquisition _tokenAcquisition;
        private readonly GraphServiceClient _graphClient;
        private readonly AuthService _authService;
        private readonly IUsuariosService _usuarioService;
        public UsuarioInteriorController(
            AuthService authService, ApplicatonDBContext context,
            ITokenAcquisition tokenAcquisition, GraphServiceClient graphClient,
            IUsuariosService usuarioService)
        {
            _authService = authService;
            _context = context;
            _tokenAcquisition = tokenAcquisition;
            _graphClient = graphClient;
            _usuarioService = usuarioService;
        }

        [HttpGet]
        [Authorize(Policy = "AzureAdPolicy")]
        public IActionResult GetAll()
        {
            try
            {
                var Usuarios = _context.UsuariosInternos
                    .Where(c => c.Estado == true).ToList()
                    .Select(c => c.ToUsuarioInteriorDto());

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
        [Authorize(Policy = "AzureAdPolicy")]
        public IActionResult GetUsuarioById([FromRoute] int id)
        {
            try
            {
                var UsuarioModel = _context.UsuariosInternos.Find(id);

                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(UsuarioModel.ToUsuarioInteriorDto());
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

        //[HttpGet("ByEmail")]
        /*[Authorize(Policy = "AzureAdPolicy")]
        public IActionResult GetUsuariosByEmail([FromQuery] string Email)
        {
            try
            {
                var UsuarioModel = _context.UsuariosInternos
                .Where(c => c.Email == Email).ToList()
                .FirstOrDefault();

                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(UsuarioModel.ToUsuarioInteriorDto());
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
        }*/

        //[HttpGet("ByRol")]
        /*[Authorize(Policy = "AzureAdPolicy")]
        public IActionResult GetUsuariosByRol([FromQuery] SelectUsuarioInsideDtoRol UsuarioDto)
        {
            try
            {
                var UsuariosModel = _context.UsuariosInternos
                .Where(c => c.Id_Rol == UsuarioDto.Id_Rol).ToList()
                .Select(c => c.ToUsuarioInteriorDto());

                if (UsuariosModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(UsuariosModel);
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
        }*/

        //[HttpPost]
        /*public IActionResult Create([FromBody] CreateUsuarioInsideDto UsuarioDto)
        {
            try
            {
                var UsuarioModel = UsuarioDto.ToUsuarioInsideFromCreateDTO();

                _context.UsuariosInternos.Add(UsuarioModel);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetUsuarioById),
                    new { id = UsuarioModel.Id }, UsuarioModel.ToUsuarioInteriorDto()
                );
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
        }*/

        //[HttpPut]
        //[Route("{id:int}")]
        /*public IActionResult Update([FromRoute] int id, [FromBody] UpdateUsuarioInsideDto UsuarioDto)
        {
            try
            {
                var UsuarioModel = _context.UsuariosInternos.FirstOrDefault(c => c.Id == id);

                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    UsuarioModel.Nombre = 
                        (UsuarioDto.Nombre == null) ? UsuarioModel.Nombre : UsuarioDto.Nombre;
                    UsuarioModel.Email = 
                        (UsuarioDto.Email == null) ? UsuarioModel.Email : UsuarioDto.Email;
                    UsuarioModel.Azure_AD_User_Id =
                        (UsuarioDto.Azure_AD_User_Id == null) ? UsuarioModel.Azure_AD_User_Id : UsuarioDto.Azure_AD_User_Id;
                    UsuarioModel.Puesto = 
                        (UsuarioDto.Puesto == null) ? UsuarioModel.Puesto : UsuarioDto.Puesto;
                    UsuarioModel.Estado =
                        (UsuarioDto.Estado == null) ? UsuarioModel.Estado : UsuarioDto.Estado;
                    UsuarioModel.Id_Rol = 
                        (UsuarioDto.Id_Rol == null) ? UsuarioModel.Id_Rol : UsuarioDto.Id_Rol;
                    UsuarioModel.Id_Pais = 
                        (UsuarioDto.Id_Pais == null) ? UsuarioModel.Id_Pais : UsuarioDto.Id_Pais;
                    UsuarioModel.Fecha_Modificacion = DateTime.UtcNow;
                    _context.SaveChanges();

                    return Ok(UsuarioModel.ToUsuarioInteriorDto());
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
        }*/

        [HttpPut("{id:int}")]
        [Authorize(Policy = "AzureAdPolicy")]
        public IActionResult UpdateRol([FromRoute] int id, [FromBody] UpdateUsuarioInsideDtoRol UsuarioDto)
        {
            try
            {
                var UsuarioModel = _context.UsuariosInternos.ToList()
                    .FirstOrDefault(c => c.Id == id);

                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    UsuarioModel.Id_Rol = (UsuarioDto.Id_Rol == null) ? UsuarioModel.Id_Rol : UsuarioDto.Id_Rol;
                    _context.SaveChanges();

                    return Ok(UsuarioModel.ToUsuarioInteriorDto());
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

        //[HttpDelete]
        //[Route("{id:int}")]
        /*public IActionResult Delete([FromRoute] int id)
        {
            try
            {
                var UsuarioModel = _context.UsuariosInternos.FirstOrDefault(c => c.Id == id);

                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    _context.UsuariosInternos.Remove(UsuarioModel);
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
        }*/

        //[HttpPost("Register")]
        //[Authorize(Policy = "AzureAdPolicy")]
        /*public IActionResult RegisterUserAzure([FromBody] RegisterUsuarioInsideDto UsuarioDto)
        {
            try
            {
                var UsuarioModel = _context.UsuariosInternos
                .Where(c => c.Email == UsuarioDto.Email).ToList()
                .FirstOrDefault();//Esta busqueda tambien debe hacerse en azure

                if (UsuarioModel == null)
                {
                    var UsuarioModelFinal = UsuarioDto.ToUsuarioFromRegisterInsideDTO();
                    _context.UsuariosInternos.Add(UsuarioModelFinal);
                    _context.SaveChanges();

                    return CreatedAtAction(nameof(GetUsuarioById),
                        new { id = UsuarioModelFinal.Id }, UsuarioModelFinal.ToUsuarioInteriorDto()
                    );
                }
                else
                {
                    return StatusCode(
                        500, $"Ya existe un usuario con el email: {UsuarioDto.Email}\n Usuario:\n{UsuarioModel.ToUsuarioInteriorDto()}"
                    );
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
        }*/

        /*[HttpGet("Inside/GetAzureUsers")]
        [Authorize(Policy = "AzureAdPolicy")] // Requiere token de Azure AD
        public async Task<IActionResult> GetAzureUsers()
        {
            try
            {
                var users = await _graphClient.Users.GetAsync(requestConfig =>
                {
                    requestConfig.QueryParameters.Select = new[]
                    {
                        "id", "displayName", "mail", "userPrincipalName","jobTitle","country","employeeType"
                    };
                    requestConfig.QueryParameters.Top = 10;
                });
                //var users = await _graphClient.Users.GetAsync();

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
        }*/

        [HttpGet("Inside/GetAllSync")]
        [Authorize(Policy = "AzureAdPolicy")]
        public async Task<IActionResult> GetAllSync()
        {
            try
            {
                int result = await _usuarioService.SyncUserADtoDBAsync();

                if(result == 1)
                {
                    return StatusCode(500, $"Error al extraer datos de usuarios de azure\n");
                }
                else
                {
                    var Usuarios = _context.UsuariosInternos
                    .Where(c => c.Estado == true).ToList()
                    .Select(c => c.ToUsuarioInteriorDto());

                    return Ok(Usuarios);
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

        [HttpPost("Login")]
        [Authorize(Policy = "AzureAdPolicy")]
        public IActionResult OutsideLogin([FromBody] LoginUsuarioInsideDto LoginDto)
        {
            var UsuarioModel = _context.UsuariosInternos.FirstOrDefault(c => c.Email == LoginDto.Email);

            if (UsuarioModel == null)
            {
                return StatusCode(500, $"No se ha encontrado usuario con email: {LoginDto.Email}\n");
            }
            else
            {
                return CreatedAtAction(nameof(GetUsuarioById),
                    new { id = UsuarioModel.Id }, UsuarioModel.ToUsuarioInteriorDto()
                );
            }
        }

        [HttpPatch("{id:int}")]
        [Authorize(Policy = "AzureAdPolicy")] 
        public IActionResult ActivateInside([FromRoute] int id, [FromBody] StatusUsuarioInsideDto UsuarioDto)
        {
            try
            {
                var UsuarioModel = _context.UsuariosInternos.ToList()
                    .FirstOrDefault(c => c.Id == id);
                
                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    UsuarioModel.Estado = UsuarioDto.Estado;
                    _context.SaveChanges();

                    return Ok(UsuarioModel.ToUsuarioInteriorDto());
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
    }
}