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
        public ReceiptDE ManageReceipt(ReceiptDE mod)
        {
            bool closeConnectionFlag = false;
            try
            {
                _entity = TableNames.RCV_Receipt.ToString();
                if (cmd == null || cmd.Connection.State != ConnectionState.Open)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnectionFlag = true;
                }
                if (mod.DBoperation == DBoperations.Insert)
                    mod.Id = _coreDAL.GetnextId(_entity);



                if (_rcvDAL.RCV_Manage_Receipt(mod, cmd))
                {
                    mod.AddSuccessMessage(string.Format(AppConstants.CRUD_DB_OPERATION, _entity, mod.DBoperation.ToString()));
                    _logger.Info($"Success: " + string.Format(AppConstants.CRUD_DB_OPERATION, _entity, mod.DBoperation.ToString()));
                }
                else
                {
                    mod.AddErrorMessage(string.Format(AppConstants.CRUD_ERROR, _entity));
                    _logger.Info($"Error: " + string.Format(AppConstants.CRUD_ERROR, _entity));
                }
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
            return mod;
        }
        public List<ReceiptDE> SearchReceipt(ReceiptDE mod)
        {
            List<ReceiptDE> Receipt = new List<ReceiptDE>();
            bool closeConnectionFlag = false;
            try
            {
                if (cmd == null || cmd.Connection.State != ConnectionState.Open)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnectionFlag = true;
                }
                #region Search

                string WhereClause = " Where 1=1";
                if (mod.Id != default && mod.Id != 0)
                    WhereClause += $" AND rcpt.Id={mod.Id}";

                if (mod.CustomerId != default && mod.CustomerId != 0)
                    WhereClause += $" AND rcpt.CustomerId={mod.CustomerId}";
                if (mod.Date != default)
                    WhereClause += $" and rcpt.Date like ''" + mod.Date + "''";
                if (mod.Number != default)
                    WhereClause += $" and rcpt.Number like ''" + mod.Number + "''";
                if (mod.Amount != default)
                    WhereClause += $" and rcpt.Amount like ''" + mod.Amount + "''";
                if (mod.Comments != default)
                    WhereClause += $" and rcpt.Comments like ''" + mod.Comments + "''";
                if (mod.NextPayDate != default)
                    WhereClause += $" and rcpt.NextPayDate like ''" + mod.NextPayDate + "''";
                if (mod.IsActive != default && mod.IsActive == true)
                    WhereClause += $" AND rcpt.IsActive=1";
               
                    Receipt = _rcvDAL.RCV_Search_Receipt(WhereClause, cmd);

                #endregion
            }
            catch (Exception exp)
            {
                _logger.Error(exp);
                throw;
            }
            finally
            {
                if (closeConnectionFlag)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
            return Receipt;
        }

    }
}
