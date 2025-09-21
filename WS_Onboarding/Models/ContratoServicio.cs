using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WS_Onboarding.Models
{
    public class ContratoServicio
    {
        public int Id { get; set; }
        public int IdContrato { get; set; }
        public int IdServicio { get; set; }

        // Navigation
        public Contrato? Contrato { get; set; }
        public Servicio? Servicio { get; set; }
    }
}