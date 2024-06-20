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
    public class FiscalYearService
    {
        #region Class Variables
        private FiscalYearDAL _fyDAL;
        private CoreDAL _coreDAL;
        private Logger _logger;
        #endregion
        #region Constructor
        public FiscalYearService()
        {
            _fyDAL = new FiscalYearDAL();
            _coreDAL = new CoreDAL();
            _logger = LogManager.GetLogger("fileLogger");
        }
        #endregion
        #region  FiscalYear
        public bool ManageFiscalYear(FiscalYearDE _fy)
        {
            bool retVal = false;
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;

                if (_fy.DBoperation == DBoperations.Insert)
                    _fy.Id = _coreDAL.GetnextId(TableNames.FiscalYear.ToString());
                retVal = _fyDAL.ManageFiscalYear(_fy, cmd);
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
        public List<FiscalYearDE> SearchFiscalYear(FiscalYearDE _fy)
        {
            List<FiscalYearDE> retVal = new List<FiscalYearDE>();
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;
                string WhereClause = " Where 1=1";
                if (_fy.Id != default)
                    WhereClause += $" AND Id={_fy.Id}";
                if (_fy.YearCode != default)
                    WhereClause += $" and YearCode like ''" + _fy.YearCode + "''";
                if (_fy.YearDesc != default)
                    WhereClause += $" and YearDesc like ''" + _fy.YearDesc + "''";
                if (_fy.YearDateFrom != default)
                    WhereClause += $" and YearDateFrom like ''" + _fy.YearDateFrom + "''";
                if (_fy.YearDateTo != default)
                    WhereClause += $" and YearDateTo like ''" + _fy.YearDateTo + "''";
                if (_fy.IsActiveYear != default && _fy.IsActiveYear == true)
                    WhereClause += $" AND IsActiveYear=1";
                if (_fy.IsActive != default && _fy.IsActive == true)
                    WhereClause += $" AND IsActive=1";


                retVal = _fyDAL.SearchFiscalYear(WhereClause, cmd);
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
