using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WS_Onboarding.Data;
using WS_Onboarding.Dtos;
using WS_Onboarding.Mappers;


namespace WS_Onboarding.Controllers
{
    [Route("WS_Onboarding/Rol")]
    [ApiController]
    public class RolController : ControllerBase
    {
        private readonly ApplicatonDBContext _context;
        public RolController(ApplicatonDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var Roles = _context.Roles.ToList()
                    .Select(c => c.ToRolDto());

                return Ok(Roles);
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
        public IActionResult GetRolById([FromRoute] int id)
        {
            try
            {
                var RolModel = _context.Roles.Find(id);

                if (RolModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(RolModel.ToRolDto());
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
        public IActionResult Create([FromBody] CreateRolDto RolDto)
        {
            try
            {
                Models.Rol RolModel = RolDto.ToRolFromCreateDTO();

                _context.Roles.Add(RolModel);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetRolById), new { id = RolModel.Id }, RolModel.ToRolDto());
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
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateRolDto RolDto)
        {
            try
            {
                var RolModel = _context.Roles.FirstOrDefault(c => c.Id == id);

                if (RolModel == null)
                {
                    return NotFound();
                }
                else
                {
                    RolModel.Nombre = (RolDto.Nombre == null) ? RolModel.Nombre : RolDto.Nombre;
                    RolModel.Fecha_Modificacion = DateTime.UtcNow;
                    _context.SaveChanges();

                    return Ok(RolModel.ToRolDto());
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
                var RolModel = _context.Roles.FirstOrDefault(c => c.Id == id);

                if (RolModel == null)
                {
                    return NotFound();
                }
                else
                {
                    _context.Roles.Remove(RolModel);
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
    }
}