using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WS_Onboarding.Data;
using WS_Onboarding.Dtos;
using WS_Onboarding.Mappers;

namespace WS_Onboarding.Controllers
{
    [Route("WS_Onboarding/Servicio")]
    [ApiController]
    public class ServicioController : ControllerBase
    {
        private readonly ApplicatonDBContext _context;
        public ServicioController(ApplicatonDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var Servicios = _context.Servicios.ToList()
                    .Select(c => c.ToServicioDto());

                return Ok(Servicios);
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
        public IActionResult GetServicioById([FromRoute] int id)
        {
            try
            {
                var ServicioModel = _context.Servicios.Find(id);

                if (ServicioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(ServicioModel.ToServicioDto());
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
        public IActionResult Create([FromBody] CreateServicioDto ServicioDto)
        {
            try
            {
                Models.Servicio ServicioModel = ServicioDto.ToServicioFromCreateDTO();
                ServicioModel.Fecha_Creacion = DateTime.UtcNow;
                ServicioModel.Fecha_Modificacion = DateTime.UtcNow;

                _context.Servicios.Add(ServicioModel);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetServicioById), new { id = ServicioModel.Id }, ServicioModel.ToServicioDto());
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
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateServicioDto ServicioDto)
        {
            try
            {
                var ServicioModel = _context.Servicios.FirstOrDefault(c => c.Id == id);

                if (ServicioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    ServicioModel.Nombre = ServicioDto.Nombre;
                    ServicioModel.Id_pais = (ServicioDto.Id_pais == null || ServicioDto.Id_pais.Equals("")) ? ServicioModel.Id_pais : ServicioDto.Id_pais;
                    ServicioModel.Fecha_Modificacion = DateTime.UtcNow;
                    _context.SaveChanges();

                    return Ok(ServicioModel.ToServicioDto());
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
                var ServicioModel = _context.Servicios.FirstOrDefault(c => c.Id == id);

                if (ServicioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    _context.Servicios.Remove(ServicioModel);
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