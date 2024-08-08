using LMS.DAL.CTL;
using LMS.Service.CTL;
using LMS.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Service.CTL
{
    public partial class CtlService : BaseService, ICtlService
    {
        #region Class Variables

        public ICtlDAL _ctlDAL;

        #endregion
        #region Constructor

        public CtlService(ICtlDAL ctlDAL)
        {
            _ctlDAL = ctlDAL;
        }

        #endregion
    }
}
