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
            var Paiss = _context.Paises.ToList()
                .Select(c => c.ToPaisDto());

            return Ok(Paiss);
        }

        [HttpGet("{id}")]
        public IActionResult GetPaisById([FromRoute] int id)
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

        [HttpPost]
        public IActionResult Create([FromBody] CreatePaisDto PaisDto)
        {
            var PaisModel = PaisDto.ToPaisFromCreateDTO();

            _context.Paises.Add(PaisModel);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetPaisById), new { id = PaisModel.Id }, PaisModel.ToPaisDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdatePaisDto PaisDto)
        {
            var PaisModel = _context.Paises.FirstOrDefault(c => c.Id == id);

            if (PaisModel == null)
            {
                return NotFound();
            }
            else
            {
                PaisModel.Nombre = PaisDto.Nombre;
                _context.SaveChanges();

                return Ok(PaisModel.ToPaisDto());
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Delete([FromRoute] int id)
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
    }
}