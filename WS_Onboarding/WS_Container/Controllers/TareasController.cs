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
    [Route("WS_Onboarding/Tareas")]
    [ApiController]
    public class TareasController : Controller
    {
        private readonly ApplicatonDBContext _context;

        public TareasController(ApplicatonDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var Tareas = _context.Tareas.ToList()
                    .Select(c => c.ToTareaDto());

                return Ok(Tareas);
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
        public IActionResult GetTareaById([FromRoute] int id)
        {
            try
            {
                var TareaModel = _context.Tareas.Find(id);

                if (TareaModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(TareaModel.ToTareaDto());
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
        public IActionResult Create([FromBody] CreateTareasDto tareaDto)
        {
            try
            {
                Models.Tareas TareaModel = tareaDto.ToTareaFromCreateDTO();

                _context.Tareas.Add(TareaModel);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetTareaById), new { id = TareaModel.Id }, TareaModel.ToTareaDto());
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
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateTareasDto tareaDto)
        {
            try
            {
                var TareaModel = _context.Tareas.FirstOrDefault(c => c.Id == id);

                if (TareaModel == null)
                {
                    return NotFound();
                }
                else
                {
                    TareaModel.Nombre = (tareaDto.Nombre == null) ? TareaModel.Nombre : tareaDto.Nombre;
                    TareaModel.Id_Servicio = (tareaDto.Id_Servicio == 0) ? TareaModel.Id_Servicio : tareaDto.Id_Servicio;
                    TareaModel.Descripcion = (tareaDto.Descripcion == null) ? TareaModel.Descripcion : tareaDto.Descripcion;
                    TareaModel.Fecha_Modificacion = DateTime.UtcNow;
                    _context.SaveChanges();

                    return Ok(TareaModel.ToTareaDto());
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
                var TareaModel = _context.Tareas.FirstOrDefault(c => c.Id == id);

                if (TareaModel == null)
                {
                    return NotFound();
                }
                else
                {
                    _context.Tareas.Remove(TareaModel);
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