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
    public class ServiceOutlineService
    {
        #region Class Variables
        private ServiceOutlineDAL _sevDAL;
        private CoreDAL _coreDAL;
        private Logger _logger;
        #endregion
        #region Constructor
        public ServiceOutlineService()
        {
            _sevDAL = new ServiceOutlineDAL();
            _coreDAL = new CoreDAL();
            _logger = LogManager.GetLogger("fileLogger");
        }
        #endregion
        #region 
        public bool ManageServiceOutline(ServiceOutlineDE _sev)
        {
            bool retVal = false;
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;

                if (_sev.DBoperation == DBoperations.Insert)
                    _sev.Id = _coreDAL.GetnextId(TableNames.ServiceOutline.ToString());
                retVal = _sevDAL.ManageServiceOutline(_sev, cmd);
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
        public List<ServiceOutlineDE> SearchServiceOutline(ServiceOutlineDE _sev)
        {
            List<ServiceOutlineDE> retVal = new List<ServiceOutlineDE>();
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;
                string WhereClause = " Where 1=1";
                if (_sev.Id != default)
                    WhereClause += $" AND Id={_sev.Id}";
                if (_sev.ServiceId != default)
                    WhereClause += $" and ServiceId like ''" + _sev.ServiceId + "''";
                if (_sev.Content != default)
                    WhereClause += $" and Content like ''" + _sev.Content + "''";
                if (_sev.IsActive != default && _sev.IsActive == true)
                    WhereClause += $" AND IsActive=1";


                retVal = _sevDAL.SearchServiceOutline(WhereClause, cmd);
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
