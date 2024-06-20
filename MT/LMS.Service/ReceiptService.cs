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
    public class ReceiptService
    {
        #region Class Variables
        private ReceiptDAL _recDAL;
        private CoreDAL _coreDAL;
        private Logger _logger;
        #endregion
        #region Constructor
        public ReceiptService()
        {
            _recDAL = new ReceiptDAL();
            _coreDAL = new CoreDAL();
            _logger = LogManager.GetLogger("fileLogger");
        }
        #endregion
        #region 
        public bool ManageReceipt(ReceiptDE _rec)
        {
            bool retVal = false;
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;

                if (_rec.DBoperation == DBoperations.Insert)
                    _rec.Id = _coreDAL.GetnextId(TableNames.Receipt.ToString());
                retVal = _recDAL.ManageReceipt(_rec, cmd);
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
        public List<ReceiptDE> SearchReceipt(ReceiptDE _rec)
        {
            List<ReceiptDE> retVal = new List<ReceiptDE>();
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;
                string WhereClause = " Where 1=1";
                if (_rec.Id != default)
                    WhereClause += $" AND Id={_rec.Id}";
                if (_rec.CustomerId != default)
                    WhereClause += $" and CustomerId like ''" + _rec.CustomerId + "''";
                if (_rec.Date != default)
                    WhereClause += $" and Date like ''" + _rec.Date + "''";
                if (_rec.Number != default)
                    WhereClause += $" and Number like ''" + _rec.Number + "''";
                if (_rec.Amount != default)
                    WhereClause += $" and Amount like ''" + _rec.Amount + "''";
                if (_rec.Comments != default)
                    WhereClause += $" and Comments like ''" + _rec.Comments + "''";
                if (_rec.NextPayDate != default)
                    WhereClause += $" and NextPayDate like ''" + _rec.NextPayDate + "''";
                if (_rec.IsActive != default && _rec.IsActive == true)
                    WhereClause += $" AND IsActive=1";


                retVal = _recDAL.SearchReceipt(WhereClause, cmd);
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
