using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Entities
{
    public class AppointmentDE : BaseDomain
    {

        public int InquiryId { get; set; }
        public int StatusId { get; set; }
        public DateTime NextApptDate { get; set; }
        public string? Comment { get; set; }//


    }
}
