using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WS_Onboarding.Data;
using WS_Onboarding.Dtos;
using WS_Onboarding.Mappers;
using Microsoft.Identity.Web;
using Microsoft.Graph;
using Microsoft.Extensions.Logging;
using System.Net.Http.Headers;
using WS_Onboarding.Functions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Kiota.Abstractions.Authentication;

namespace WS_Onboarding.Controllers
{
    [Route("WS_Onboarding/User/Outside")]
    [ApiController]
    public class UsuarioExteriorController : ControllerBase
    {
        private readonly ApplicatonDBContext _context;
        private readonly ITokenAcquisition _tokenAcquisition;
        private readonly GraphServiceClient _graphClient;
        private readonly AuthService _authService;
        public UsuarioExteriorController(AuthService authService, ApplicatonDBContext context, ITokenAcquisition tokenAcquisition, GraphServiceClient graphClient)
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
                var Usuarios = _context.UsuariosExternos
                    .Where(c => c.Estado == true).ToList()
                    .Select(c => c.ToUsuarioExternoDto());

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
                var UsuarioModel = _context.UsuariosExternos.Find(id);

                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(UsuarioModel.ToUsuarioExternoDto());
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
        /*public IActionResult GetUsuariosByEmail([FromQuery] string Email)
        {
            try
            {
                var UsuarioModel = _context.UsuariosExternos
                .Where(c => c.Email == Email).ToList()
                .FirstOrDefault();

                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(UsuarioModel.ToUsuarioExternoDto());
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
        /*public IActionResult GetUsuariosByRol([FromQuery] SelectUsuarioOutsideDtoRol UsuarioDto)
        {
            try
            {
                var UsuariosModel = _context.UsuariosExternos
                .Where(c => c.Id_Rol == UsuarioDto.Id_Rol).ToList()
                .Select(c => c.ToUsuarioExternoDto());

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
        /*public IActionResult Create([FromBody] CreateUsuarioOutsideDto UsuarioDto)
        {
            try
            {
                var UsuarioModel = UsuarioDto.ToUsuarioFromCreateDTO();
                UsuarioModel.Contrasena = (UsuarioDto.Contrasena == null) 
                    ? UsuarioModel.Contrasena : _authService.HashPassword(UsuarioDto.Contrasena);

                _context.UsuariosExternos.Add(UsuarioModel);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetUsuarioById),
                    new { id = UsuarioModel.Id }, UsuarioModel.ToUsuarioExternoDto()
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
        /*public IActionResult Update([FromRoute] int id, [FromBody] UpdateUsuarioOutsideDto UsuarioDto)
        {
            try
            {
                var UsuarioModel = _context.UsuariosExternos.FirstOrDefault(c => c.Id == id);

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
                    UsuarioModel.Contrasena = 
                        (UsuarioDto.Contrasena == null) ? UsuarioModel.Contrasena : _authService.HashPassword(UsuarioDto.Contrasena);
                    UsuarioModel.Estado =
                        (UsuarioDto.Estado == null) ? UsuarioModel.Estado : UsuarioDto.Estado;
                    UsuarioModel.Id_Rol = 
                        (UsuarioDto.Id_Rol == null) ? UsuarioModel.Id_Rol : UsuarioDto.Id_Rol;
                    UsuarioModel.Id_Cliente = 
                        (UsuarioDto.Id_Cliente == null) ? UsuarioModel.Id_Cliente : UsuarioDto.Id_Cliente;
                    UsuarioModel.Fecha_Modificacion = DateTime.UtcNow;
                    _context.SaveChanges();

                    return Ok(UsuarioModel.ToUsuarioExternoDto());
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
        public IActionResult UpdateNameEmailRol([FromRoute] int id, [FromBody] UpdateUsuarioOutsideDtoNameEmailRol UsuarioDto)
        {
            try
            {
                var UsuarioModel = _context.UsuariosExternos.ToList()
                    .FirstOrDefault(c => c.Id == id);

                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    UsuarioModel.Nombre = (UsuarioDto.Nombre == null) ? UsuarioModel.Nombre : UsuarioDto.Nombre;
                    UsuarioModel.Email = (UsuarioDto.Email == null) ? UsuarioModel.Email : UsuarioDto.Email ;
                    UsuarioModel.Id_Rol = (UsuarioDto.Id_Rol == null) ? UsuarioModel.Id_Rol : UsuarioDto.Id_Rol;
                    UsuarioModel.Contrasena = (UsuarioDto.Contrasena == null) ? UsuarioModel.Contrasena : UsuarioDto.Contrasena;
                    _context.SaveChanges();

                    return Ok(UsuarioModel.ToUsuarioExternoDto());
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
                var UsuarioModel = _context.UsuariosExternos.FirstOrDefault(c => c.Id == id);

                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    _context.UsuariosExternos.Remove(UsuarioModel);
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

        [HttpPatch("{id:int}")]
        public IActionResult ActivateOutside([FromRoute] int id, [FromBody] StatusUsuarioOutsideDto UsuarioDto)
        {
            try
            {
                var UsuarioModel = _context.UsuariosExternos.ToList()
                    .FirstOrDefault(c => c.Id == id);
                
                if (UsuarioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    UsuarioModel.Estado = UsuarioDto.Estado;
                    _context.SaveChanges();

                    return Ok(UsuarioModel.ToUsuarioExternoDto());
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
        public IActionResult RegisterUserOutside([FromBody] RegisterUsuarioOutsideDto UsuarioDto)
        {
            try
            {
                var UsuarioModel = _context.UsuariosExternos
                .Where(c => c.Email == UsuarioDto.Email).ToList()
                .FirstOrDefault();

                if (UsuarioModel == null)
                {
                    var NewUsuarioModel = UsuarioDto.ToUsuarioFromRegisterOutsideDTO();
                    NewUsuarioModel.Contrasena = _authService.HashPassword(UsuarioDto.Contrasena);

                    _context.UsuariosExternos.Add(NewUsuarioModel);
                    _context.SaveChanges();

                    return CreatedAtAction(nameof(GetUsuarioById),
                        new { id = NewUsuarioModel.Id }, NewUsuarioModel.ToUsuarioExternoDto()
                    );
                }
                else
                {
                    if (UsuarioModel.Estado == true)
                    {
                        return StatusCode(500, $"El usuario externo con el email: {UsuarioDto.Email} ya existe y esta activo\n");
                    }
                    else
                    {
                        UsuarioModel.Estado = true;
                        _context.SaveChanges();
                        return Ok(UsuarioModel.ToUsuarioExternoDto());
                    }
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

        [HttpPost("Password/Change/{email}")]//Falta implementar Email
        public IActionResult ChangePassword([FromRoute] string email,[FromBody] ChangeUsuarioPasswordDto UsuarioDto)
        {
            try
            {
                var UsuarioModel = _context.UsuariosExternos.FirstOrDefault(c => c.Email == email);

                if (UsuarioModel == null)
                {
                    return StatusCode(500, $"No existe un usuario con el email: {email}\n");
                }
                else
                {
                    if (
                        UsuarioModel.Contrasena == null ||
                        _authService.VerifyPassword(UsuarioDto.ContrasenaVieja, UsuarioModel.Contrasena)
                    )
                    {
                        UsuarioModel.Contrasena = _authService.HashPassword(UsuarioDto.ContrasenaNueva);
                        _context.SaveChanges();

                        return CreatedAtAction(nameof(GetUsuarioById),
                            new { id = UsuarioModel.Id }, UsuarioModel.ToUsuarioExternoDto()
                        );
                    }
                    else
                    {
                        return StatusCode(500, $"La contraseña anterior ingresada: \"{UsuarioDto.ContrasenaVieja}\"."
                            +" No coincide con la contraseña actualmente registrada\n");
                    }
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
        public IActionResult LoginOutside([FromBody] LoginUsuarioOutsideDto LoginDto)
        {
            var UsuarioModel = _context.UsuariosExternos.FirstOrDefault(c => c.Email == LoginDto.Email);

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

                return CreatedAtAction(nameof(GetUsuarioById),
                    new { id = UsuarioModel.Id }, UsuarioModel.ToUsuarioExternoDto()
                );
            }
        }
    }
}