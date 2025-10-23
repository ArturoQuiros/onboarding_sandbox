using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Models
{
    public class EmailRequest
    {
        public required string From { get; set; }
        public required string FromPassword { get; set; }
        public required string To { get; set; }
        public required string Subject { get; set; }
        public required string Body { get; set; }
    }
}