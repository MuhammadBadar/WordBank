using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Entities
{
    public class ReceiptDE : BaseDomain
    {
        public int CustomerId { get; set; }
        public DateTime Date { get; set; }
        public int Number { get; set; }
        public double Amount { get; set; }
        public string? Comments { get; set; }
        public DateTime NextPayDate { get; set; }
       
    }
}
