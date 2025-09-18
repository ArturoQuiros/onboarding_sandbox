using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WS_Onboarding.Dtos.Company;
using WS_Onboarding.Models;

namespace WS_Onboarding.Mappers
{
    public static class CompanyMappers
    {
        public static CompanyDto ToCompanyDto(this Company companyModel)
        {
            return new CompanyDto
            {
                Id = companyModel.Id,
                Name = companyModel.Name
            };
        }

        public static Company ToCompanyFromCreateDTO(this CreateCompanyRequestDto companyModel)
        {
            return new Company
            {
                Name = companyModel.Name
            };
        }
    }
}