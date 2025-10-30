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

        //GetAll full y simple
        [HttpGet("GetAllFull")]
        public IActionResult GetAllFull()
        {
            try
            {
                var resultado = _context.Tarea_Contrato
                    .Select(tc => new
                    {
                        TareaContrato = tc.ToTareaContratoFullDto(),
                        tc.Tarea.EsInterno,
                        tc.Tarea.Descripcion
                    }).ToList();

                return Ok(resultado);
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
        
        [HttpGet("GetAllSimple")]
        public IActionResult GetAllSimple()
        {
            try
            {
                var resultado = _context.Tarea_Contrato
                    .Select(tc => new 
                    {
                        TareaContrato = tc.ToTareaContratoSimpleDto(),
                        tc.Tarea.EsInterno
                    }).ToList();

                return Ok(resultado);
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

        [HttpGet("GetByIdFull")]
        public IActionResult GetByIdFull([FromQuery] int Id_TareaContrato)
        {
            try
            {
                var TareaContratoModel = _context.Tarea_Contrato
                    .Where(tc => tc.Id == Id_TareaContrato)
                    .Select(tc => new
                    {
                        TareaContrato = tc.ToTareaContratoFullDto(),
                        tc.Tarea.EsInterno,
                        tc.Tarea.Descripcion
                    })
                    .FirstOrDefault();

                if (TareaContratoModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(TareaContratoModel);
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

        [HttpGet("GetByIdSimple")]
        public IActionResult GetByIdSimple([FromQuery] int Id_TareaContrato)
        {
            try
            {
                var TareaContratoModel = _context.Tarea_Contrato
                    .Where(tc => tc.Id == Id_TareaContrato)
                    .Select(tc => new
                    {
                        TareaContrato = tc.ToTareaContratoSimpleDto(),
                        tc.Tarea.EsInterno
                    })
                    .FirstOrDefault();

                if (TareaContratoModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(TareaContratoModel);
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

        [HttpGet("GetByContratoSimple")]
        public IActionResult GetByContratoSimple([FromQuery] int Id_Contrato)
        {
            try
            {
                var TareaContratoModel = _context.Tarea_Contrato
                    .Where(tc => tc.Id_Contrato == Id_Contrato)
                    .Select(tc => new
                    {
                        TareaContrato = tc.ToTareaContratoSimpleDto(),
                        tc.Tarea.EsInterno
                    })
                    .FirstOrDefault();

                if (TareaContratoModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(TareaContratoModel);
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

                _context.Tarea_Contrato.Add(TareaContratoModel);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetByIdFull), new { id = TareaContratoModel.Id }, TareaContratoModel.ToTareaContratoFullDto());
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
                var TareaContratoModel = _context.Tarea_Contrato.FirstOrDefault(c => c.Id == id);

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
                    TareaContratoModel.Observaciones = (tareaContratoDto.Observaciones == null) ? TareaContratoModel.Observaciones : tareaContratoDto.Observaciones;
                    _context.SaveChanges();

                    return Ok(TareaContratoModel.ToTareaContratoFullDto());
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
                var TareaContratoModel = _context.Tarea_Contrato.FirstOrDefault(c => c.Id == id);

                if (TareaContratoModel == null)
                {
                    return NotFound();
                }
                else
                {
                    _context.Tarea_Contrato.Remove(TareaContratoModel);
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