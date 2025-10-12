using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WS_Onboarding.Data;
using WS_Onboarding.Dtos;
using WS_Onboarding.Mappers;

namespace WS_Onboarding.Controllers
{
    [Route("WS_Onboarding/ContratoServicio")]
    [ApiController]
    public class ContratoServicioController : ControllerBase
    {
        private readonly ApplicatonDBContext _context;
        public ContratoServicioController(ApplicatonDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var ContratoServicios = _context.Contrato_Servicios.ToList()
                    .Select(c => c.ToContratoServicioDto());

                return Ok(ContratoServicios);
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
        public IActionResult GetContratoServicioById([FromRoute] int id)
        {
            try
            {
                var ContratoServicioModel = _context.Contrato_Servicios.Find(id);

                if (ContratoServicioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(ContratoServicioModel.ToContratoServicioDto());
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

        [HttpGet("ByContrato")]
        public IActionResult GetContratoServicioByIdContrato([FromQuery] int IdContrato)
        {
            try
            {
                var ContratoServicios = _context.Contrato_Servicios
                .Where(c => c.Id_Contrato == IdContrato).ToList()
                .Select(c => c.ToContratoServicioDto());

                if (ContratoServicios == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(ContratoServicios);
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

        [HttpGet("ByServicio")]
        public IActionResult GetContratoServicioByIdServicio([FromQuery] int IdServicio)
        {
            try
            {
                var ContratoServicioModel = _context.Contrato_Servicios
                .Where(c => c.Id_Servicio == IdServicio).ToList()
                .Select(c => c.ToContratoServicioDto());

                if (ContratoServicioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(ContratoServicioModel);
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

        [HttpGet("ByContratoAndServicio")]
        public IActionResult GetContratoServicioByIdContratoAndIdServicio([FromQuery] CreateContratoServicioDto ContratoServicioDto)
        {
            var ContratoServicioModel = _context.Contrato_Servicios
            .Where(c => c.Id_Contrato == ContratoServicioDto.Id_Contrato && c.Id_Servicio == ContratoServicioDto.Id_Servicio)
            .FirstOrDefault();

            if (ContratoServicioModel == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(ContratoServicioModel.ToContratoServicioDto());
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateContratoServicioDto ContratoServicioDto)
        {
            var ContratoServicioModel = ContratoServicioDto.ToContratoServicioFromCreateDTO();

            _context.Contrato_Servicios.Add(ContratoServicioModel);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetContratoServicioByIdContratoAndIdServicio),
            new { ContratoServicioModel.Id_Contrato, ContratoServicioModel.Id_Servicio },
            ContratoServicioModel.ToContratoServicioDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateContratoServicioDto ContratoServicioDto)
        {
            try
            {
                var ContratoServicioModel = _context.Contrato_Servicios.Find(id);

                if (ContratoServicioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    ContratoServicioModel.Id_Contrato = ContratoServicioDto.Id_Contrato;
                    ContratoServicioModel.Id_Servicio = ContratoServicioDto.Id_Servicio;
                    ContratoServicioModel.Estado = (ContratoServicioDto.Estado == null) ? ContratoServicioModel.Estado : ContratoServicioDto.Estado;
                    ContratoServicioModel.Fecha_Modificacion = DateTime.UtcNow;
                    _context.SaveChanges();

                    return Ok(ContratoServicioModel.ToContratoServicioDto());
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
                var ContratoServicioModel = _context.Contrato_Servicios.Find(id);

                if (ContratoServicioModel == null)
                {
                    return NotFound();
                }
                else
                {
                    _context.Contrato_Servicios.Remove(ContratoServicioModel);
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
        
        [HttpPost("RelacionContratoServicio")]
        public IActionResult RelacionContratoServicio([FromBody] CreateContratoServicioDto ContratoServicioDto)
        {
            Models.ContratoServicio nuevoContratoServicio = new Models.ContratoServicio
            {
                Id_Contrato = ContratoServicioDto.Id_Contrato,
                Id_Servicio = ContratoServicioDto.Id_Servicio,
                Estado = ContratoServicioDto.Estado
            };

            var ContratoServicioModel = _context.Contrato_Servicios
            .Where(c => c.Id_Contrato == ContratoServicioDto.Id_Contrato && c.Id_Servicio == ContratoServicioDto.Id_Servicio)
            .FirstOrDefault();

            if (ContratoServicioModel == null)
            {
                CreateContratoServicioDto crearContratoServicio = new CreateContratoServicioDto
                {
                    Id_Contrato = ContratoServicioDto.Id_Contrato,
                    Id_Servicio = ContratoServicioDto.Id_Servicio,
                    Estado = (ContratoServicioDto.Estado == null) ? false : ContratoServicioDto.Estado
                };
                Create(crearContratoServicio);
                
                return CreatedAtAction(nameof(GetContratoServicioByIdContratoAndIdServicio),
                new { ContratoServicioDto.Id_Contrato, ContratoServicioDto.Id_Servicio },
                nuevoContratoServicio.ToContratoServicioDto());
            }
            else
            {
                UpdateContratoServicioDto actualizarContratoServicio = new UpdateContratoServicioDto
                {
                    Id_Contrato = ContratoServicioDto.Id_Contrato,
                    Id_Servicio = ContratoServicioDto.Id_Servicio,
                    Estado = (ContratoServicioDto.Estado == null) ? ContratoServicioModel.Estado : ContratoServicioDto.Estado
                };
                Update(ContratoServicioModel.Id, actualizarContratoServicio);

                return CreatedAtAction(nameof(GetContratoServicioByIdContratoAndIdServicio),
                new { ContratoServicioDto.Id_Contrato, ContratoServicioDto.Id_Servicio },
                ContratoServicioModel.ToContratoServicioDto());
            }
        }
    }
}