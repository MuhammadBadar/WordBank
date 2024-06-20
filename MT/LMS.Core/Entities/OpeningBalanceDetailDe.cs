using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Entities
{
    public class OpeningBalanceDetailDE : BaseDomain
    {
        public int ClientId { get; set; }
        public int CoaCodeId { get; set; }
        public string YearCode { get; set; }

        public int CoaDebitAmt { get; set; }
        public int CoaCreditAmt { get; set; }

    }
}
