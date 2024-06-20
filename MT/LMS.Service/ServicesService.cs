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
    public class ServicesService
    {
        #region Class Variables
        private ServicesDAL _serDAL;
        private CoreDAL _coreDAL;
        private Logger _logger;
        #endregion
        #region Constructor
        public ServicesService()
        {
            _serDAL = new ServicesDAL();
            _coreDAL = new CoreDAL();
            _logger = LogManager.GetLogger("fileLogger");
        }
        #endregion
        #region 
        public bool ManageServices(ServicesDE _ser)
        {
            bool retVal = false;
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;

                if (_ser.DBoperation == DBoperations.Insert)
                    _ser.Id = _coreDAL.GetnextId(TableNames.Services.ToString());
                retVal = _serDAL.ManageServices(_ser, cmd);
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
        public List<ServicesDE> SearchServices(ServicesDE _ser)
        {
            List<ServicesDE> retVal = new List<ServicesDE>();
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;
                string WhereClause = " Where 1=1";
                if (_ser.Id != default)
                    WhereClause += $" AND Id={_ser.Id}";
                if (_ser.SerName != default)
                    WhereClause += $" and SerName like ''" + _ser.SerName + "''";
                if (_ser.SerTitle != default)
                    WhereClause += $" and SerTitle like ''" + _ser.SerTitle + "''";
                if (_ser.IsActive != default && _ser.IsActive == true)
                    WhereClause += $" AND IsActive=1";


                retVal = _serDAL.SearchServices(WhereClause, cmd);
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

