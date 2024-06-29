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
        public bool ManageCustomer(CustomerDE _cust)
        {
            bool retVal = false;
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;

                if (_cust.DBoperation == DBoperations.Insert)
                    _cust.Id = _coreDAL.GetnextId(TableNames.customer.ToString());
                retVal = _rcvDAL.ManageCustomer(_cust, cmd);
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
        public List<CustomerDE> SearchCustomer(CustomerDE _cust)
        {
            List<CustomerDE> retVal = new List<CustomerDE>();
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;
                string WhereClause = " Where 1=1";
                if (_cust.Id != default)
                    WhereClause += $" AND Id={_cust.Id}";
                if (_cust.ClientId != default)
                    WhereClause += $" AND ClientId={_cust.ClientId}";
                if (_cust.PaymentTermId != default)
                    WhereClause += $" AND PaymentTermId={_cust.PaymentTermId}";
                if (_cust.Name != default)
                    WhereClause += $" and Name like ''" + _cust.Name + "''";
                if (_cust.Email != default)
                    WhereClause += $" and Email like ''" + _cust.Email + "''";
                if (_cust.Phone != default)
                    WhereClause += $" and Phone like ''" + _cust.Phone + "''";
                if (_cust.Address != default)
                    WhereClause += $" and Address like ''" + _cust.Address + "''";
                if (_cust.CreditLimit != default)
                    WhereClause += $" and CreditLimit like ''" + _cust.CreditLimit + "''";
                if (_cust.IsActive != default && _cust.IsActive == true)
                    WhereClause += $" AND IsActive=1";


                retVal = _rcvDAL.SearchCustomer(WhereClause, cmd);
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
