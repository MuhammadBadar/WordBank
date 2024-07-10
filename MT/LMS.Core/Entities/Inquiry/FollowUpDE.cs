using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Entities.Inquiry
{
    public class FollowUpDE : BaseDomain
    {

        public int StatusId { get; set; }
        public int InquiryId { get; set; }
        public DateTime Date { get; set; }

        public DateTime NextAppointmentDate { get; set; }
        public string? Comment { get; set; }


    }
}
