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
            var ContratoServicios = _context.Contrato_Servicios.ToList()
                .Select(c => c.ToContratoServicioDto());

            return Ok(ContratoServicios);
        }

        [HttpGet("{id}")]
        public IActionResult GetContratoServicioById([FromRoute] int id)
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

        [HttpGet("ByContrato")]
        public IActionResult GetContratoServicioByIdContrato([FromQuery] int IdContrato)
        {
            var ContratoServicios = _context.Contrato_Servicios
            .Where(c => c.IdContrato == IdContrato)
            .ToList();

            if (ContratoServicios == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(ContratoServicios);
            }
        }

        [HttpGet("ByServicio")]
        public IActionResult GetContratoServicioByIdServicio([FromQuery] int IdServicio)
        {
            var ContratoServicioModel = _context.Contrato_Servicios
            .Where(c => c.IdServicio == IdServicio)
            .ToList();

            if (ContratoServicioModel == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(ContratoServicioModel);
            }
        }

        [HttpGet("ByContratoAndServicio")]
        public IActionResult GetContratoServicioByIdContratoAndIdServicio([FromQuery] CreateContratoServicioDto ContratoServicioDto)
        {
            var ContratoServicioModel = _context.Contrato_Servicios
            .Where(c => c.IdContrato == ContratoServicioDto.IdContrato && c.IdServicio == ContratoServicioDto.IdServicio)
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
            new { ContratoServicioModel.IdContrato, ContratoServicioModel.IdServicio},
            ContratoServicioModel.ToContratoServicioDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateContratoServicioDto ContratoServicioDto)
        {
            //Esta tabla no deberia actualizar registros
            return NoContent();
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Delete([FromRoute] int id)
        {
            //Esta tabla no deberia eliminar regstros
            return NoContent();
        }
    }
}