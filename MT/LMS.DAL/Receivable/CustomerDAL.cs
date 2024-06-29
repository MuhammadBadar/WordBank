using Dapper;
using LMS.Core.Entities;
using MySql.Data.MySqlClient;
using System;

using LMS.Core.Entities.Receivable;
using LMS.Core.Constants;
using LMS.Core.Enums;
using System.Drawing.Printing;
using System.Drawing;
using System.Data;
using LMS.DAL.Receivable;

namespace LMS.DAL.Receivable
{
    public partial class ReceivableDAL : IRcvDAL
    {

        #region DbOperations

        public bool ManageCustomer(CustomerDE _cust, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = "Manage_Customer";

                cmd.Parameters.AddWithValue("prm_id", _cust.Id);
                cmd.Parameters.AddWithValue("prm_clientId", _cust.ClientId);
                cmd.Parameters.AddWithValue("prm_paymentTermId", _cust.PaymentTermId);
                cmd.Parameters.AddWithValue("prm_name", _cust.Name);
                cmd.Parameters.AddWithValue("prm_email", _cust.Email);
                cmd.Parameters.AddWithValue("prm_phone", _cust.Phone);
                cmd.Parameters.AddWithValue("prm_address", _cust.Address);
                cmd.Parameters.AddWithValue("prm_creditLimit", _cust.CreditLimit);
                cmd.Parameters.AddWithValue("prm_createdOn", _cust.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", _cust.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", _cust.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", _cust.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", _cust.IsActive);
                cmd.Parameters.AddWithValue("prm_dbOperation", _cust.DBoperation.ToString());
                cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                if (closeConnection)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        public List<CustomerDE> SearchCustomer(string WhereClause, MySqlCommand cmd)
        {
            bool closeConnection = false;
            
            List<CustomerDE> lec = new List<CustomerDE>();
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                lec = cmd.Connection.Query<CustomerDE>("call lms.Search_Customer('" + WhereClause + "')").ToList();
                return lec;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (closeConnection)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        #endregion
    }
}
