using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Entities.Receivable
{
    public class CustomerDE : BaseDomain
    {
        #region Properties

        public int PaymentTermId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public decimal? CreditLimit { get; set; }


        #endregion
        #region View Properties

        public string?  PaymentTerm { get; set; }


        #endregion
    }
}
