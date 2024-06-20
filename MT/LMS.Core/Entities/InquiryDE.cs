
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Entities
{
    public class InquiryDE:BaseDomain
    {       
        public string? InquiryName { get; set; }
        public string? InquiryEmail { get; set; }
        public string? InquiryCell { get; set; }
        public string? InquiryComments { get; set; }
      
    }
}
