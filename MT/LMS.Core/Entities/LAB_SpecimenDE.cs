using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Entities
{
    public class LAB_SpecimenDE : BaseDomain
    {
        public int ClientId { get; set; }
        public int Id { get; set; }
        public int Name { get; set; }
    }
}
