using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace LMS.Core.Entities.CTL  
{
    public class CTL_AdditionalParameterDE : BaseDomain
    {
        #region Properties

        public int EntityTypeId { get; set; }
        public int? EntityId { get; set; }
        public int? FieldId { get; set; }
        public string? FieldValue { get; set; }


        #endregion

    }
}
