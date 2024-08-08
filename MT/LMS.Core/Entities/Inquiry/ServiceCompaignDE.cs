using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Entities.Inquiry
{
    public class ServiceCompaignDE : BaseDomain
    {
        public int? TemplateId { get; set; }
        public int? ServiceId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Title { get; set; }


        #region View Properties

        public string? Templates { get; set; }
        public string? Services { get; set; }


        #endregion

    }
}
