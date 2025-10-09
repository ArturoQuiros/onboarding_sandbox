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
    [Route("WS_Onboarding/Pais")]
    [ApiController]
    public class PaisController : ControllerBase
    {
        private readonly ApplicatonDBContext _context;
        public PaisController(ApplicatonDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var Paiss = _context.Paises.ToList()
                    .Select(c => c.ToPaisDto());

                return Ok(Paiss);
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
        public IActionResult GetPaisById([FromRoute] int id)
        {
            try
            {
                var PaisModel = _context.Paises.Find(id);

                if (PaisModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(PaisModel.ToPaisDto());
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
        public IActionResult Create([FromBody] CreatePaisDto PaisDto)
        {
            try
            {
                Models.Pais PaisModel = PaisDto.ToPaisFromCreateDTO();
                PaisModel.Fecha_Creacion = DateTime.UtcNow;
                PaisModel.Fecha_Modificacion = DateTime.UtcNow;

                _context.Paises.Add(PaisModel);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetPaisById), new { id = PaisModel.Id }, PaisModel.ToPaisDto());
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
        public IActionResult Update([FromRoute] int id, [FromBody] UpdatePaisDto PaisDto)
        {
            try
            {
                var PaisModel = _context.Paises.FirstOrDefault(c => c.Id == id);

                if (PaisModel == null)
                {
                    return NotFound();
                }
                else
                {
                    PaisModel.Nombre = PaisDto.Nombre;
                    PaisModel.Fecha_Modificacion = DateTime.UtcNow;
                    _context.SaveChanges();

                    return Ok(PaisModel.ToPaisDto());
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
                var PaisModel = _context.Paises.FirstOrDefault(c => c.Id == id);

                if (PaisModel == null)
                {
                    return NotFound();
                }
                else
                {
                    _context.Paises.Remove(PaisModel);
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