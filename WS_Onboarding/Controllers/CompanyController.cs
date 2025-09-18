using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WS_Onboarding.Data;
using WS_Onboarding.Dtos.Company;
using WS_Onboarding.Mappers;

namespace WS_Onboarding.Controllers
{
    [Route("WS_Onboarding/Company")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ApplicatonDBContext _context;
        public CompanyController(ApplicatonDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var Companies = _context.Company.ToList()
                .Select(c => c.ToCompanyDto());

            return Ok(Companies);
        }

        [HttpGet("{id}")]
        public IActionResult GetCompanyById([FromRoute] int id)
        {
            var companyModel = _context.Company.Find(id);

            if (companyModel == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(companyModel.ToCompanyDto());
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateCompanyRequestDto companyDto)
        {
            var companyModel = companyDto.ToCompanyFromCreateDTO();

            _context.Company.Add(companyModel);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetCompanyById), new { id = companyModel.Id }, companyModel.ToCompanyDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateCompanyRequestDto companyDto)
        {
            var companyModel = _context.Company.FirstOrDefault(c => c.Id == id);

            if (companyModel == null)
            {
                return NotFound();
            }
            else
            {
                companyModel.Name = companyDto.Name;
                _context.SaveChanges();

                return Ok(companyModel.ToCompanyDto());   
            }
        }
        
        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var companyModel = _context.Company.FirstOrDefault(c => c.Id == id);

            if (companyModel == null)
            {
                return NotFound();
            }
            else
            {
                _context.Company.Remove(companyModel);
                _context.SaveChanges();

                return NoContent();
            }
        }
    }
}