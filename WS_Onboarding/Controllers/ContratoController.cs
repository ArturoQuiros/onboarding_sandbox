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
            var Contratos = _context.Contratos.ToList()
                .Select(c => c.ToContratoDto());

            return Ok(Contratos);
        }

        [HttpGet("{id}")]
        public IActionResult GetContratoById([FromRoute] int id)
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

        [HttpPost]
        public IActionResult Create([FromBody] CreateContratoDto ContratoDto)
        {
            var ContratoModel = ContratoDto.ToContratoFromCreateDTO();

            _context.Contratos.Add(ContratoModel);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetContratoById), new { id = ContratoModel.Id }, ContratoModel.ToContratoDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateContratoDto ContratoDto)
        {
            var ContratoModel = _context.Contratos.FirstOrDefault(c => c.Id == id);

            if (ContratoModel == null)
            {
                return NotFound();
            }
            else
            {
                ContratoModel.Id_Cliente = ContratoDto.Id_Cliente;
                ContratoModel.Numero_contrato = ContratoDto.Numero_contrato;
                ContratoModel.Estado = ContratoDto.Estado;
                ContratoModel.Account_manager = ContratoDto.Account_manager;
                _context.SaveChanges();

                return Ok(ContratoModel.ToContratoDto());
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Delete([FromRoute] int id)
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
    }
}