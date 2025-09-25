using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WS_Onboarding.Data;
using WS_Onboarding.Dtos;
using WS_Onboarding.Mappers;
using WS_Onboarding.Controllers;
using Microsoft.EntityFrameworkCore;

namespace WS_Onboarding.Controllers
{
    [Route("WS_Onboarding/Default")]
    [ApiController]
    public class DefaultController : ControllerBase
    {
        private readonly ApplicatonDBContext _context;
        public DefaultController(ApplicatonDBContext context)
        {
            _context = context;
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var Paises = _context.Paises.ToList()
                .Select(c => c.ToPaisDto());

            var Roles = _context.Roles.ToList()
                .Select(c => c.ToRolDto());

            var Usuarios = _context.Usuarios.ToList()
                .Select(c => c.ToUsuarioDto());

            var Servicios = _context.Servicios.ToList()
                .Select(c => c.ToServicioDto());

            var Clientes = _context.Clientes.ToList()
                .Select(c => c.ToClienteDto());

            var Contratos = _context.Contratos.ToList()
                .Select(c => c.ToContratoDto());

            var Contrato_Servicios = _context.Contrato_Servicios.ToList()
                .Select(c => c.ToContratoServicioDto());

            var allData = new AllDataDto
            {
                Paises = Paises,
                Roles = Roles,
                Usuarios = Usuarios,
                Servicios = Servicios,
                Clientes = Clientes,
                Contratos = Contratos,
                Contrato_Servicios = Contrato_Servicios
            };

            return Ok(allData);
        }

        [HttpPost("Seed")]
        public IActionResult Create()
        {
            var pais1 = new Models.Pais
            {
                Nombre = "Argentina",
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };

            var pais2 = new Models.Pais
            {
                Nombre = "México",
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };

            var pais3 = new Models.Pais
            {
                Nombre = "Colombia",
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };

            _context.Paises.AddRange(pais1, pais2, pais3);
            _context.SaveChanges();

            var rol1 = new Models.Rol
            {
                Nombre = "Administrador",
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };

            var rol2 = new Models.Rol
            {
                Nombre = "Gerente",
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };

            var rol3 = new Models.Rol
            {
                Nombre = "Usuario",
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };

            _context.Roles.AddRange(rol1, rol2, rol3);
            _context.SaveChanges();

            var cliente1 = new Models.Cliente
            {
                Nombre = "Empresa Alpha",
                Email = "contacto@alpha.com",
                Telefono = "+54 11 1234-5678",
                Direccion = "Calle Falsa 123, Buenos Aires",
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };

            var cliente2 = new Models.Cliente
            {
                Nombre = "Soluciones XYZ",
                Email = "info@xyz.com",
                Telefono = "+52 55 9876-5432",
                Direccion = "Av. Reforma 456, CDMX",
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };

            _context.Clientes.AddRange(cliente1, cliente2);
            _context.SaveChanges();

            var servicio1 = new Models.Servicio
            {
                Nombre = "Hosting",
                Id_pais = 1,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };

            var servicio2 = new Models.Servicio
            {
                Nombre = "Correo Corporativo",
                Id_pais = 2,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };

            var servicio3 = new Models.Servicio
            {
                Nombre = "Soporte Técnico",
                Id_pais = 3,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };

            _context.Servicios.AddRange(servicio1, servicio2, servicio3);
            _context.SaveChanges();

            var usuario1 = new Models.Usuario
            {
                Nombre = "Juan Pérez",
                Azure_AD_User_Id = "aad-juanp",
                Email = "juan.perez@example.com",
                Id_Pais = 1,
                Role_Id = 1,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };

            var usuario2 = new Models.Usuario
            {
                Nombre = "Lucía Gómez",
                Azure_AD_User_Id = "aad-luciag",
                Email = "lucia.gomez@example.com",
                Id_Pais = 2,
                Role_Id = 2,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };

            var usuario3 = new Models.Usuario
            {
                Nombre = "Carlos Ruiz",
                Azure_AD_User_Id = "aad-carlosr",
                Email = "carlos.ruiz@example.com",
                Id_Pais = 3,
                Role_Id = 3,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };

            _context.Usuarios.AddRange(usuario1, usuario2, usuario3);
            _context.SaveChanges();

            var contrato1 = new Models.Contrato
            {
                Id_Cliente = 1,
                Numero_contrato = "CT-ARG-001",
                Estado = "Activo",
                Account_manager = 1,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };

            var contrato2 = new Models.Contrato
            {
                Id_Cliente = 2,
                Numero_contrato = "CT-MEX-001",
                Estado = "Pendiente",
                Account_manager = 2,
                Fecha_Creacion = DateTime.UtcNow,
                Fecha_Modificacion = DateTime.UtcNow
            };

            _context.Contratos.AddRange(contrato1, contrato2);
            _context.SaveChanges();

            var contratoServicio1 = new Models.ContratoServicio
            {
                Id_Contrato = 1,
                Id_Servicio = 1
            };

            var contratoServicio2 = new Models.ContratoServicio
            {
                Id_Contrato = 2,
                Id_Servicio = 2
            };

            _context.Contrato_Servicios.AddRange(contratoServicio1, contratoServicio2);
            _context.SaveChanges();

            return GetAll();
        }

        [HttpDelete]
        [Route("Clean")]
        public IActionResult Delete()
        {
            var AllPaises = _context.Paises.ToList();
            _context.Paises.RemoveRange(AllPaises);

            var AllRoles = _context.Roles.ToList();
            _context.Roles.RemoveRange(AllRoles);

            var AllUsuarios = _context.Usuarios.ToList();
            _context.Usuarios.RemoveRange(AllUsuarios);

            var AllServicios = _context.Servicios.ToList();
            _context.Servicios.RemoveRange(AllServicios);

            var AllClientes = _context.Clientes.ToList();
            _context.Clientes.RemoveRange(AllClientes);

            var AllContratos = _context.Contratos.ToList();
            _context.Contratos.RemoveRange(AllContratos);

            var AllContrato_Servicios = _context.Contrato_Servicios.ToList();
            _context.Contrato_Servicios.RemoveRange(AllContrato_Servicios);

            _context.Database.ExecuteSqlRaw("DBCC CHECKIDENT ('Paises', RESEED, 0);");
            _context.Database.ExecuteSqlRaw("DBCC CHECKIDENT ('Roles', RESEED, 0);");
            _context.Database.ExecuteSqlRaw("DBCC CHECKIDENT ('Usuarios', RESEED, 0);");
            _context.Database.ExecuteSqlRaw("DBCC CHECKIDENT ('Servicios', RESEED, 0);");
            _context.Database.ExecuteSqlRaw("DBCC CHECKIDENT ('Clientes', RESEED, 0);");
            _context.Database.ExecuteSqlRaw("DBCC CHECKIDENT ('Contratos', RESEED, 0);");
            _context.Database.ExecuteSqlRaw("DBCC CHECKIDENT ('Contrato_Servicios', RESEED, 0);");

            _context.SaveChanges();

            return NoContent();
        }
    }
}