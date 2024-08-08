using LMS.Core.Entities.CTL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Service.CTL
{
    public interface ICtlService
    {


        public CTL_AdditionalParameterDE ManageCTL_AdditionalParameter(CTL_AdditionalParameterDE mod);
        public List<CTL_AdditionalParameterDE> SearchCTL_AdditionalParameter(CTL_AdditionalParameterDE mod);



    }
}

