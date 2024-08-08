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
using LMS.Core.Extenstions; 

using static Dapper.SqlMapper;

namespace LMS.Service.Receivable
{
    public partial class RecevService
    {
        public InvoiceDE ManageInvoice(InvoiceDE mod)
        {
            bool closeConnectionFlag = false;
            try
            {
                _entity = TableNames.RCV_Invoice.ToString();
                if (cmd == null || cmd.Connection.State != ConnectionState.Open)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnectionFlag = true;
                }
                if (mod.DBoperation == DBoperations.Insert)
                    mod.Id = _coreDAL.GetNextIdByClient(_entity, mod.ClientId, "ClientId");



                if (_rcvDAL.RCV_Manage_Invoice(mod, cmd))
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
        public List<InvoiceDE> SearchInvoice(InvoiceDE mod)
        {
            List<InvoiceDE> Invoice = new List<InvoiceDE>();
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
                if (mod.ClientId != default && mod.ClientId != 0)
                    WhereClause += $" AND inv.ClientId={mod.ClientId}";
                if (mod.Id != default && mod.Id != 0)
                    WhereClause += $" AND inv.Id={mod.Id}";
                if (mod.CustomerId != default && mod.CustomerId != 0)
                    WhereClause += $" AND inv.CustomerId={mod.CustomerId}";
                if (mod.InvDate != default)
                    WhereClause += $" and inv.InvDate like ''" + mod.InvDate + "''";
                if (mod.InvNo != default)
                    WhereClause += $" and inv.InvNo like ''" + mod.InvNo + "''";
                if (mod.InvAmount != default)
                    WhereClause += $" and inv.InvAmount like ''" + mod.InvAmount + "''";

                if (mod.FromDate.HasValue && mod.FromDate.Value > AppConstants.DEFAULT_DATE)
                    WhereClause += $" AND InvDate >= ''{mod.FromDate.Value:yyyy-MM-dd} 00:00:00''";

                if (mod.ToDate.HasValue && mod.ToDate.Value > AppConstants.DEFAULT_DATE)
                    WhereClause += $" AND InvDate <= ''{mod.ToDate.Value:yyyy-MM-dd} 23:59:59''";

                if (mod.Comments != default)
                    WhereClause += $" and inv.Comments like ''" + mod.Comments + "''";
                if (mod.IsActive != default && mod.IsActive == true)
                    WhereClause += $" AND inv.IsActive=1";
                if (mod.PageNo != default)
                    Invoice = _rcvDAL.RCV_Search_Invoice(WhereClause, cmd, mod.PageNo, mod.PageSize);
                else
                    Invoice = _rcvDAL.RCV_Search_Invoice(WhereClause, cmd);
                 
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
            return Invoice;
        }

    }
}
