using LMS.DAL.Inquiry;
using LMS.Service.Inquiry;
using LMS.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Service.Inquiry
{
    public partial class InqService : BaseService, IInqService
    {
        #region Class Variables

        public IInqDAL _inqDAL;

        #endregion
        #region Constructor

        public InqService(IInqDAL inqDAL)
        {
            _inqDAL = inqDAL;
        }

        #endregion
    }
}
