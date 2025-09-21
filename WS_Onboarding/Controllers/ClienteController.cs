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
            var Clientes = _context.Clientes.ToList()
                .Select(c => c.ToClienteDto());

            return Ok(Clientes);
        }

        [HttpGet("{id}")]
        public IActionResult GetClienteById([FromRoute] int id)
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

        [HttpPost]
        public IActionResult Create([FromBody] CreateClienteDto ClienteDto)
        {
            var ClienteModel = ClienteDto.ToClienteFromCreateDTO();

            _context.Clientes.Add(ClienteModel);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetClienteById), new { id = ClienteModel.Id }, ClienteModel.ToClienteDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateClienteDto ClienteDto)
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
                _context.SaveChanges();

                return Ok(ClienteModel.ToClienteDto());   
            }
        }
        
        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Delete([FromRoute] int id)
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
    }
}