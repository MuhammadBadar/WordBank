using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LMS.Core.Entities;
using LMS.Core.Enums;
using LMS.DAL;
using MySql.Data.MySqlClient;
using NLog;

namespace LMS.Service
{
    public class FollowUpService
    {
        #region Class Variables
        private FollowUpDAL _followDAL;
        private CoreDAL _coreDAL;
        private Logger _logger;
        #endregion
        #region Constructor
        public FollowUpService()
        {
            _followDAL = new FollowUpDAL();
            _coreDAL = new CoreDAL();
            _logger = LogManager.GetLogger("fileLogger");
        }
        #endregion
        #region 
        public bool ManageFollowUp(FollowUpDE _follow)
        {
            bool retVal = false;
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;

                if (_follow.DBoperation == DBoperations.Insert)
                    _follow.Id = _coreDAL.GetnextId(TableNames.FollowUp.ToString());
                retVal = _followDAL.ManageFollowUp(_follow, cmd);
                return retVal;
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                throw;
            }
            finally
            {
                if (closeConnectionFlag)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        public List<FollowUpDE> SearchFollowUp(FollowUpDE _follow)
        {
            List<FollowUpDE> retVal = new List<FollowUpDE>();
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;
                string WhereClause = " Where 1=1";
                if (_follow.Id != default)
                    WhereClause += $" AND Id={_follow.Id}";
                if (_follow.StatusId != default)
                    WhereClause += $" and StatusId like ''" + _follow.StatusId + "''";
                if (_follow.InquiryId != default)
                    WhereClause += $" and InquiryId  like ''" + _follow.InquiryId + "''";
                if (_follow.Date != default)
                    WhereClause += $" and Date like ''" + _follow.Date + "''";
                if (_follow.NextAppointmentDate != default)
                    WhereClause += $" and NextAppointmentDate like ''" + _follow.NextAppointmentDate + "''";
                if (_follow.Comment != default)
                    WhereClause += $" and Comment like ''" + _follow.Comment + "''";
                if (_follow.IsActive != default && _follow.IsActive == true)
                    WhereClause += $" AND IsActive=1";


                retVal = _followDAL.SearchFollowUp(WhereClause, cmd);
                return retVal;
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                throw;
            }
            finally
            {
                if (closeConnectionFlag)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        #endregion
    }
}
