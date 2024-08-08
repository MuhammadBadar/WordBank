using LMS.Core.Entities.Inquiry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Entities.Inquiry
{
    public class ServiceChargesDE : BaseDomain
    {
        public int? InquiryId { get; set; }
        public Decimal? ServiceCharges { get; set; }
        public DateTime? NextDueDate { get; set; }
        public string? Comments { get; set; }



    }
}
