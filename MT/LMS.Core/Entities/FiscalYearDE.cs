using LMS.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Entities
{
    public class FiscalYearDE : BaseDomain

    {
       
        public string? YearCode { get; set; }

        public string? YearDesc { get; set; }
        public DateTime YearDateFrom { get; set; }
        public DateTime YearDateTo { get; set; }
        public Boolean IsActiveYear { get; set; }

    }
}
