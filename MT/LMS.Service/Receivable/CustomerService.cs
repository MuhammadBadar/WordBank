using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LMS.Core.Entities;
using LMS.Core.Enums;
using LMS.Core.Entities.Receivable;
using LMS.DAL.Receivable;
using System.Data;
using K4os.Hash.xxHash;
using LMS.Core.Constants;

using static Dapper.SqlMapper;
using LMS.DAL;

namespace LMS.Service.Receivable
{
    public partial class RecevService
    {

        public CustomerDE ManageCustomer(CustomerDE mod) 
        {
            bool closeConnectionFlag = false;
            try
            {
                _entity = TableNames.RCV_Customer.ToString();
                if (cmd == null || cmd.Connection.State != ConnectionState.Open)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnectionFlag = true;
                }
                if (mod.DBoperation == DBoperations.Insert)
                    mod.Id = _coreDAL.GetNextIdByClient(_entity, mod.ClientId, "ClientId");



                if (_rcvDAL.RCV_Manage_Customer(mod, cmd))
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
        public List<CustomerDE> SearchCustomer(CustomerDE mod)
        {
            List<CustomerDE> customer = new List<CustomerDE>();
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
                    WhereClause += $" AND cust.Id={mod.Id}";
                if (mod.ClientId != default && mod.ClientId != 0)
                    WhereClause += $" AND cust.ClientId={mod.ClientId}";
                if (mod.PaymentTermId != default)
                    WhereClause += $" AND cust.PaymentTermId={mod.PaymentTermId}";
                if (mod.Name != default)
                    WhereClause += $" and cust.Name like ''" + mod.Name + "''";
                if (mod.Email != default)
                    WhereClause += $" and cust.Email like ''" + mod.Email + "''";
                if (mod.Phone != default)
                    WhereClause += $" and cust.Phone like ''" + mod.Phone + "''";
                if (mod.Address != default)
                    WhereClause += $" and cust.Address like ''" + mod.Address + "''";
                if (mod.CreditLimit != default)
                    WhereClause += $" and cust.CreditLimit like ''" + mod.CreditLimit + "''";
                if (mod.IsActive != default && mod.IsActive == true)
                    WhereClause += $" AND cust.IsActive=1";
                if (mod.PageNo != default)
                    customer = _rcvDAL.RCV_Search_Customer(WhereClause, cmd, mod.PageNo, mod.PageSize);
              else
                customer = _rcvDAL.RCV_Search_Customer(WhereClause, cmd);

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
            return customer;
        }


    }
}

       

