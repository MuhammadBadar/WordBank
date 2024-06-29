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
using LMS.Core.Entities.Receivable;
using LMS.DAL.Receivable;
using System.Data;
using K4os.Hash.xxHash;
using LMS.Core.Constants;

using static Dapper.SqlMapper;

namespace LMS.Service.Receivable
{
    public partial class RecevService
    {
        public bool ManageReceipt(ReceiptDE _rcpt)
        {
            bool retVal = false;
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;

                if (_rcpt.DBoperation == DBoperations.Insert)
                    _rcpt.Id = _coreDAL.GetnextId(TableNames.receipt.ToString());
                retVal = _rcvDAL.ManageReceipt(_rcpt, cmd);
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
        public List<ReceiptDE> SearchReceipt(ReceiptDE _rcpt)
        {
            List<ReceiptDE> retVal = new List<ReceiptDE>();
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;
                string WhereClause = " Where 1=1";
                if (_rcpt.Id != default)
                    WhereClause += $" AND Id={_rcpt.Id}";
                if (_rcpt.CustomerId != default)
                    WhereClause += $" and CustomerId like ''" + _rcpt.CustomerId + "''";
                if (_rcpt.Date != default)
                    WhereClause += $" and Date like ''" + _rcpt.Date + "''";
                if (_rcpt.Number != default)
                    WhereClause += $" and Number like ''" + _rcpt.Number + "''";
                if (_rcpt.Amount != default)
                    WhereClause += $" and Amount like ''" + _rcpt.Amount + "''";
                if (_rcpt.Comments != default)
                    WhereClause += $" and Comments like ''" + _rcpt.Comments + "''";
                if (_rcpt.NextPayDate != default)
                    WhereClause += $" and NextPayDate like ''" + _rcpt.NextPayDate + "''";
                if (_rcpt.IsActive != default && _rcpt.IsActive == true)
                    WhereClause += $" AND IsActive=1";


                retVal = _rcvDAL.SearchReceipt(WhereClause, cmd);
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

    }
}
