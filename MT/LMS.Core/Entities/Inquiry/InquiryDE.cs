using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Entities.Inquiry
{
    public class InquiryDE : BaseDomain
    {
        public int CityId { get; set; }
        public int StatusId { get; set; }

        public int CompainId { get; set; }
        public string? InquiryName { get; set; }
        public string? InquiryEmail { get; set; }
        public string? InquiryCell { get; set; }
        public string? Area { get; set; }
        public string? CNIC { get; set; }
        public string? InquiryComments { get; set; }
        public string? ServiceIds { get; set; }
        public List<int>? selectedServiceIds { get; set; }

        public string? City { get; set; }
        public string? Status  { get; set; }

    }
}
