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
        public bool ManageInvoice(InvoiceDE _inv)
        {
            bool retVal = false;
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;

                if (_inv.DBoperation == DBoperations.Insert)
                    _inv.Id = _coreDAL.GetnextId(TableNames.Invoice.ToString());
                retVal = _rcvDAL.ManageInvoice(_inv, cmd);
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
        public List<InvoiceDE> SearchInvoice(InvoiceDE _inv)
        {
            List<InvoiceDE> retVal = new List<InvoiceDE>();
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;
                string WhereClause = " Where 1=1";
                if (_inv.Id != default)
                    WhereClause += $" AND Id={_inv.Id}";
                if (_inv.CustomerId != default)
                    WhereClause += $" and CustomerId  like ''" + _inv.CustomerId + "''";
                if (_inv.InvDate != default)
                    WhereClause += $" and InvDate like ''" + _inv.InvDate + "''";
                if (_inv.InvNo != default)
                    WhereClause += $" and InvNo like ''" + _inv.InvNo + "''";
                if (_inv.InvAmount != default)
                    WhereClause += $" and InvAmount like ''" + _inv.InvAmount + "''";
                if (_inv.Comments != default)
                    WhereClause += $" and Comments like ''" + _inv.Comments + "''";
                if (_inv.IsActive != default && _inv.IsActive == true)
                    WhereClause += $" AND IsActive=1";


                retVal = _rcvDAL.SearchInvoice(WhereClause, cmd);
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
