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
    [Route("WS_Onboarding/Usuario")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly ApplicatonDBContext _context;
        public UsuarioController(ApplicatonDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var Usuarios = _context.Usuarios.ToList()
                .Select(c => c.ToUsuarioDto());

            return Ok(Usuarios);
        }

        [HttpGet("{id}")]
        public IActionResult GetUsuarioById([FromRoute] int id)
        {
            var UsuarioModel = _context.Usuarios.Find(id);

            if (UsuarioModel == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(UsuarioModel.ToUsuarioDto());
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateUsuarioDto UsuarioDto)
        {
            var UsuarioModel = UsuarioDto.ToUsuarioFromCreateDTO();

            _context.Usuarios.Add(UsuarioModel);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetUsuarioById), new { id = UsuarioModel.Id }, UsuarioModel.ToUsuarioDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateUsuarioDto UsuarioDto)
        {
            var UsuarioModel = _context.Usuarios.FirstOrDefault(c => c.Id == id);

            if (UsuarioModel == null)
            {
                return NotFound();
            }
            else
            {
                UsuarioModel.Nombre = UsuarioDto.Nombre;
                UsuarioModel.Azure_AD_User_Id = UsuarioDto.Azure_AD_User_Id;
                UsuarioModel.Email = UsuarioDto.Email;
                _context.SaveChanges();

                return Ok(UsuarioModel.ToUsuarioDto());
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var UsuarioModel = _context.Usuarios.FirstOrDefault(c => c.Id == id);

            if (UsuarioModel == null)
            {
                return NotFound();
            }
            else
            {
                _context.Usuarios.Remove(UsuarioModel);
                _context.SaveChanges();

                return NoContent();
            }
        }
    }
}