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
    [Route("WS_Onboarding/Servicio")]
    [ApiController]
    public class ServicioController : ControllerBase
    {
        private readonly ApplicatonDBContext _context;
        public ServicioController(ApplicatonDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var Servicios = _context.Servicios.ToList()
                .Select(c => c.ToServicioDto());

            return Ok(Servicios);
        }

        [HttpGet("{id}")]
        public IActionResult GetServicioById([FromRoute] int id)
        {
            var ServicioModel = _context.Servicios.Find(id);

            if (ServicioModel == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(ServicioModel.ToServicioDto());
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateServicioDto ServicioDto)
        {
            var ServicioModel = ServicioDto.ToServicioFromCreateDTO();

            _context.Servicios.Add(ServicioModel);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetServicioById), new { id = ServicioModel.Id }, ServicioModel.ToServicioDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateServicioDto ServicioDto)
        {
            var ServicioModel = _context.Servicios.FirstOrDefault(c => c.Id == id);

            if (ServicioModel == null)
            {
                return NotFound();
            }
            else
            {
                ServicioModel.Nombre = ServicioDto.Nombre;
                _context.SaveChanges();

                return Ok(ServicioModel.ToServicioDto());
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var ServicioModel = _context.Servicios.FirstOrDefault(c => c.Id == id);

            if (ServicioModel == null)
            {
                return NotFound();
            }
            else
            {
                _context.Servicios.Remove(ServicioModel);
                _context.SaveChanges();

                return NoContent();
            }
        }
    }
}