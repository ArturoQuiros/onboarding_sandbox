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
        public IActionResult GetUsuarioByEmail([FromQuery] string Email)
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

        [HttpGet("GetUsersByRol")]
        public IActionResult GetUsuariosByRol([FromQuery] int Rol)
        {
            try
            {
                var UsuariosModel = _context.Usuarios
                .Where(c => c.Role_Id == Rol).ToList()
                .Select(c => c.ToUsuarioDto());

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
        }

        [HttpGet("GetUsersByType")]
        public IActionResult GetUsersByType([FromQuery] int Tipo)
        {
            try
            {
                var UsuariosModel = _context.Usuarios
                .Where(c => c.Tipo == Tipo).ToList()
                .Select(c => c.ToUsuarioDto());

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
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateUsuarioDto UsuarioDto)
        {
            try
            {
                var UsuarioModel = UsuarioDto.ToUsuarioFromCreateDTO();

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
                    UsuarioModel.Tipo = UsuarioDto.Tipo;
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

        

        [HttpPut("UpdateRol/{id:int}")]
        public IActionResult UpdateRol([FromRoute] int id, [FromBody] UpdateUsuarioDtoRol UsuarioDto)
        {
            try
            {
                var UsuarioModel = _context.Usuarios.ToList()
                    .FirstOrDefault(c => c.Id == id);

                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    UsuarioModel.Role_Id = UsuarioDto.Role_Id;
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

        /*-------------------------------Usuarios Externos-------------------------------*/

        [HttpGet("Outside")]
        public IActionResult GetAllOutside()
        {
            try
            {
                var Usuarios = _context.Usuarios.ToList()
                    .Where(c => c.Tipo == 2).ToList()
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

        [HttpPut("Outside/Activate/{id:int}")]
        public IActionResult ActivateOutside([FromRoute] int id)
        {
            try
            {
                var UsuarioModel = _context.Usuarios.ToList()
                    .FirstOrDefault(c => c.Id == id && c.Tipo == 2);
                
                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    UsuarioModel.Estado = true;
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

        [HttpPut("Outside/Desactivate/{id:int}")]
        public IActionResult DesactivateOutside([FromRoute] int id)
        {
            try
            {
                var UsuarioModel = _context.Usuarios.ToList()
                    .FirstOrDefault(c => c.Id == id && c.Tipo == 2);

                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    UsuarioModel.Estado = false;
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

        [HttpPost("Outside")]
        public IActionResult RegisterUserOutside([FromBody] RegisterUsuarioOutsideDto UsuarioDto)
        {
            try
            {
                var UsuarioModel = UsuarioDto.ToUsuarioFromRegisterOutsideDTO();
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

        [HttpPost("Outside/RestPassword/{email}")]//Falta implementar Email
        public IActionResult RestPassword([FromRoute] string email,[FromBody] ResetUsuarioPasswordDto UsuarioDto)
        {
            try
            {
                var UsuarioModel = _context.Usuarios.FirstOrDefault(c => c.Email == email);

                if (UsuarioModel == null)
                {
                    return StatusCode(500, $"No existe un usuario con el email: {email}\n");
                }
                else
                {
                    UsuarioModel.Contrasena = _authService.HashPassword(UsuarioDto.Contrasena);
                    _context.SaveChanges();

                    return CreatedAtAction(nameof(GetUsuarioById), new { id = UsuarioModel.Id }, UsuarioModel.ToUsuarioDto());
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

        [HttpPost("Outside/Login")]
        public IActionResult LoginOutside([FromBody] LoginUsuarioOutsideDto LoginDto)
        {
            var UsuarioModel = _context.Usuarios.FirstOrDefault(c => c.Email == LoginDto.Email && c.Tipo == 2);

            if (UsuarioModel == null)
            {
                return StatusCode(500, $"No se ha encontrado usuario con email: {LoginDto.Email}\n");
            }
            else if (UsuarioModel.Contrasena == null)
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

        /*-------------------------------Usuarios Internos-------------------------------*/

        [HttpGet("Inside")]//Aun falta sincronizar con Azure
        [Authorize]
        public IActionResult GetAllInside()
        {
            try
            {
                var Usuarios = _context.Usuarios.ToList()
                    .Where(c => c.Tipo == 1).ToList()
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

        [HttpPost("Inside")]
        [Authorize]
        public IActionResult RegisterUserAzure([FromBody] RegisterUsuarioAzureDto UsuarioDto)
        {
            try
            {
                var UsuarioModel = _context.Usuarios
                .Where(c => c.Email == UsuarioDto.Email).ToList()
                .FirstOrDefault();//Esta busqueda tambien debe hacerse en azure

                if (UsuarioModel == null)
                {
                    var UsuarioModelFinal = UsuarioDto.ToUsuarioFromRegisterAzureDTO();
                    _context.Usuarios.Add(UsuarioModelFinal);
                    _context.SaveChanges();

                    return CreatedAtAction(nameof(GetUsuarioById), new { id = UsuarioModelFinal.Id }, UsuarioModelFinal.ToUsuarioDto());
                }
                else
                {
                    return StatusCode(500, $"Ya existe un usuario con el email: {UsuarioDto.Email}\n Usuario:\n{UsuarioModel.ToUsuarioDto()}");
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

        [HttpGet("Inside/GetAzureUsers")]
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

        [HttpPost("Inside/Login")]
        [Authorize] 
        public IActionResult OutsideLogin([FromBody] LoginUsuarioDto LoginDto)
        {
            var UsuarioModel = _context.Usuarios.FirstOrDefault(c => c.Email == LoginDto.Email && c.Tipo == 1);

            if (UsuarioModel == null)
            {
                return StatusCode(500, $"No se ha encontrado usuario con email: {LoginDto.Email}\n");
            }
            else
            {
                return Ok(new { message = "Autenticado" });
            }
        }

        [HttpPut("Inside/Activate/{id:int}")]
        [Authorize] 
        public IActionResult ActivateInside([FromRoute] int id)
        {
            try
            {
                var UsuarioModel = _context.Usuarios.ToList()
                    .FirstOrDefault(c => c.Id == id && c.Tipo == 1);
                
                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    UsuarioModel.Estado = true;
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

        [HttpPut("Inside/Desactivate/{id:int}")]
        [Authorize] 
        public IActionResult DesactivateInside([FromRoute] int id)
        {
            try
            {
                var UsuarioModel = _context.Usuarios.ToList()
                    .FirstOrDefault(c => c.Id == id && c.Tipo == 1);

                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    UsuarioModel.Estado = false;
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
    }
}