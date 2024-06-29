using LMS.DAL.Receivable;
using LMS.Service.Receivable;
using LMS.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Service.Receivable 
{
    public partial class RecevService  : BaseService, IRcvService 
    {
        #region Class Variables

        public IRcvDAL _rcvDAL;

        #endregion
        #region Constructor

        public RecevService(IRcvDAL rcvDAL)
        {
            _rcvDAL = rcvDAL;
        }

        #endregion
    }
}
