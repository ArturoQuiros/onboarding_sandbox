using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WS_Onboarding.Data;
using WS_Onboarding.Dtos;
using WS_Onboarding.Mappers;
using WS_Onboarding.Controllers;
using Microsoft.EntityFrameworkCore;

namespace WS_Onboarding.Controllers
{
    [Route("WS_Onboarding")]
    [ApiController]
    public class LogInController : ControllerBase
    {
        private readonly ApplicatonDBContext _context;
        public LogInController(ApplicatonDBContext context)
        {
            _context = context;
        }

        [HttpPost("LogIn")]
        [Authorize] // Requiere token de Azure AD
        public IActionResult Authentication()
        {
            return Ok("Authenticado!");
        }

        [HttpPost("LogOut")]
        [Authorize] // Requiere token de Azure AD
        public IActionResult LogOut()
        {
            return Ok("Cerrar Sesion!");
        }
    }
}