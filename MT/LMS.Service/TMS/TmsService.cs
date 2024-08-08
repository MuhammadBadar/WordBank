using LMS.Core.Entities.TMS;
using LMS.DAL.TMS;
using LMS.Service.TMS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Service.TMS
{
    public partial class TmsService : BaseService, ITmsService
    {
        #region Class Variables

        public ITmsDAL _tmsDAL ;

        #endregion
        #region Constructor

        public TmsService(ITmsDAL tmsDAL)
        {
            _tmsDAL = tmsDAL;
        }

        #endregion
    }
}
