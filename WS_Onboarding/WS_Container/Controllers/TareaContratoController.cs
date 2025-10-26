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
    [Route("WS_Onboarding/TareaContrato")]
    [ApiController]
    public class TareaContratoController : Controller
    {
        private readonly ApplicatonDBContext _context;

        public TareaContratoController(ApplicatonDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var TareasContratos = _context.TareaContrato.ToList()
                    .Select(c => c.ToTareaContratoDto());

                return Ok(TareasContratos);
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
        public IActionResult GetTareaContratoById([FromRoute] int id)
        {
            try
            {
                var TareaContratoModel = _context.TareaContrato.Find(id);

                if (TareaContratoModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(TareaContratoModel.ToTareaContratoDto());
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
        public IActionResult Create([FromBody] CreateTareaContratoDto tareaContratoDto)
        {
            try
            {
                Models.TareaContrato TareaContratoModel = tareaContratoDto.ToTareaContratoFromCreateDTO();

                _context.TareaContrato.Add(TareaContratoModel);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetTareaContratoById), new { id = TareaContratoModel.Id }, TareaContratoModel.ToTareaContratoDto());
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
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateTareaContratosDto tareaContratoDto)
        {
            try
            {
                var TareaContratoModel = _context.TareaContrato.FirstOrDefault(c => c.Id == id);

                if (TareaContratoModel == null)
                {
                    return NotFound();
                }
                else
                {
                    TareaContratoModel.Id_Contrato = (tareaContratoDto.Id_Contrato == 0) ? TareaContratoModel.Id_Contrato : tareaContratoDto.Id_Contrato;
                    TareaContratoModel.Id_Tarea = (tareaContratoDto.Id_Tarea == 0) ? TareaContratoModel.Id_Tarea : tareaContratoDto.Id_Tarea;
                    TareaContratoModel.Id_UsuarioResponsable = (tareaContratoDto.Id_UsuarioResponsable == 0) ? TareaContratoModel.Id_UsuarioResponsable : tareaContratoDto.Id_UsuarioResponsable;
                    TareaContratoModel.Id_Estado = (tareaContratoDto.Id_Estado == 0) ? TareaContratoModel.Id_Estado : tareaContratoDto.Id_Estado;
                    TareaContratoModel.Json_Respuesta = (tareaContratoDto.Json_Respuesta == null) ? TareaContratoModel.Json_Respuesta : tareaContratoDto.Json_Respuesta;
                    TareaContratoModel.Json_Respuesta = (tareaContratoDto.Json_Respuesta == null) ? TareaContratoModel.Json_Respuesta : tareaContratoDto.Json_Respuesta;
                    _context.SaveChanges();

                    return Ok(TareaContratoModel.ToTareaContratoDto());
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
                var TareaContratoModel = _context.TareaContrato.FirstOrDefault(c => c.Id == id);

                if (TareaContratoModel == null)
                {
                    return NotFound();
                }
                else
                {
                    _context.TareaContrato.Remove(TareaContratoModel);
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