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
    [Route("WS_Onboarding/EstadosTarea")]
    [ApiController]
    public class EstadosTareaController : Controller
    {
        private readonly ApplicatonDBContext _context;

        public EstadosTareaController(ApplicatonDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var EstadosTarea = _context.Estados_Tarea.ToList()
                    .Select(c => c.ToEstadosTareaDto());

                return Ok(EstadosTarea);
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
        public IActionResult GetEstadosTareaById([FromRoute] int id)
        {
            try
            {
                var EstadosTareaModel = _context.Estados_Tarea.Find(id);

                if (EstadosTareaModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(EstadosTareaModel.ToEstadosTareaDto());
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
        public IActionResult Create([FromBody] CreateEstadosTareaDto estadosTareaDto)
        {
            try
            {
                Models.EstadosTarea EstadosTareaModel = estadosTareaDto.ToEstadosTareaFromCreateDTO();

                _context.Estados_Tarea.Add(EstadosTareaModel);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetEstadosTareaById), new { id = EstadosTareaModel.Id }, EstadosTareaModel.ToEstadosTareaDto());
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
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateEstadosTareaDto estadosTareaDto)
        {
            try
            {
                var EstadosTareaModel = _context.Estados_Tarea.FirstOrDefault(c => c.Id == id);

                if (EstadosTareaModel == null)
                {
                    return NotFound();
                }
                else
                {
                    EstadosTareaModel.Id = estadosTareaDto.Id;
                    EstadosTareaModel.Nombre = (estadosTareaDto.Nombre == null) ? EstadosTareaModel.Nombre : estadosTareaDto.Nombre;
                    EstadosTareaModel.Fecha_Modificacion = DateTime.UtcNow;
                    _context.SaveChanges();

                    return Ok(EstadosTareaModel.ToEstadosTareaDto());
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
                var EstadosTareaModel = _context.Estados_Tarea.FirstOrDefault(c => c.Id == id);

                if (EstadosTareaModel == null)
                {
                    return NotFound();
                }
                else
                {
                    _context.Estados_Tarea.Remove(EstadosTareaModel);
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