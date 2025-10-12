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
    [Route("WS_Onboarding/Contrato")]
    [ApiController]
    public class ContratoController : ControllerBase
    {
        private readonly ApplicatonDBContext _context;
        public ContratoController(ApplicatonDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var Contratos = _context.Contratos.ToList()
                    .Select(c => c.ToContratoDto());

                return Ok(Contratos);
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
        public IActionResult GetContratoById([FromRoute] int id)
        {
            try
            {
                var ContratoModel = _context.Contratos.Find(id);

                if (ContratoModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(ContratoModel.ToContratoDto());
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
        public IActionResult Create([FromBody] CreateContratoDto ContratoDto)
        {
            try
            {
                Models.Contrato ContratoModel = ContratoDto.ToContratoFromCreateDTO();

                _context.Contratos.Add(ContratoModel);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetContratoById), new { id = ContratoModel.Id }, ContratoModel.ToContratoDto());
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
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateContratoDto ContratoDto)
        {
            try
            {
                var ContratoModel = _context.Contratos.FirstOrDefault(c => c.Id == id);

                if (ContratoModel == null)
                {
                    return NotFound();
                }
                else
                {
                    ContratoModel.Id_Cliente = ContratoDto.Id_Cliente;
                    ContratoModel.Estado = ContratoDto.Estado;
                    ContratoModel.Account_manager = ContratoDto.Account_manager;
                    ContratoModel.Fecha_Modificacion = DateTime.UtcNow;
                    _context.SaveChanges();

                    return Ok(ContratoModel.ToContratoDto());
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
                var ContratoModel = _context.Contratos.FirstOrDefault(c => c.Id == id);

                if (ContratoModel == null)
                {
                    return NotFound();
                }
                else
                {
                    _context.Contratos.Remove(ContratoModel);
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