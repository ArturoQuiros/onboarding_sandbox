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
    [Route("WS_Onboarding/Cliente")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly ApplicatonDBContext _context;
        public ClienteController(ApplicatonDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var Clientes = _context.Clientes.ToList()
                    .Select(c => c.ToClienteDto());

                return Ok(Clientes);
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
        public IActionResult GetClienteById([FromRoute] int id)
        {
            try
            {
                var ClienteModel = _context.Clientes.Find(id);

                if (ClienteModel == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(ClienteModel.ToClienteDto());
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
        public IActionResult Create([FromBody] CreateClienteDto ClienteDto)
        {
            try
            {
                Models.Cliente ClienteModel = ClienteDto.ToClienteFromCreateDTO();
                
                _context.Clientes.Add(ClienteModel);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetClienteById), new { id = ClienteModel.Id }, ClienteModel.ToClienteDto());
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
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateClienteDto ClienteDto)
        {
            try
            {
                var ClienteModel = _context.Clientes.FirstOrDefault(c => c.Id == id);

                if (ClienteModel == null)
                {
                    return NotFound();
                }
                else
                {
                    ClienteModel.Nombre = ClienteDto.Nombre;
                    ClienteModel.Email = ClienteDto.Email;
                    ClienteModel.Telefono = ClienteDto.Telefono;
                    ClienteModel.Direccion = ClienteDto.Direccion;
                    ClienteModel.Fecha_Modificacion = DateTime.UtcNow;
                    _context.SaveChanges();

                    return Ok(ClienteModel.ToClienteDto());   
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
                var ClienteModel = _context.Clientes.FirstOrDefault(c => c.Id == id);

                if (ClienteModel == null)
                {
                    return NotFound();
                }
                else
                {
                    _context.Clientes.Remove(ClienteModel);
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