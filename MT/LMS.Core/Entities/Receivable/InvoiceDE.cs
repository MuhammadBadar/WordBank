using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Entities.Receivable
{
    public class InvoiceDE : BaseDomain
    {
        public int CustomerId { get; set; }
        public DateTime InvDate { get; set; }
        public string? InvNo { get; set; }
        public decimal InvAmount { get; set; }
        public string? Comments { get; set; }
    }
}
