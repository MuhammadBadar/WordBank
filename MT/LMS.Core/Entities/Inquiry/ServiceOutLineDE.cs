using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Entities.Inquiry
{
    public class ServiceOutlineDE : BaseDomain
    {

        public int ServiceId { get; set; }
        public string? Content { get; set; }

        public string? Services  { get; set; }
    }
}
