using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web;
using Microsoft.Kiota.Abstractions.Authentication;

namespace WS_Onboarding.Controllers
{
    [Route("test")]
    public class TestController : ControllerBase
    {
        private readonly ITokenAcquisition _tokenAcquisition;

        public TestController(ITokenAcquisition tokenAcquisition)
        {
            _tokenAcquisition = tokenAcquisition;
        }

        [HttpGet]
        public IActionResult Get() => Ok("ITokenAcquisition está funcionando");
    }
}