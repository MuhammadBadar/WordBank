using Dapper;
using MySql.Data.MySqlClient;
using LMS.Core.Entities.Receivable;
using LMS.Core.Constants;
using System.Data;


namespace LMS.DAL.Receivable
{
    public partial class ReceivableDAL : IRcvDAL
    {

        #region DbOperations
        public bool RCV_Manage_Customer(CustomerDE mod, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = SPNames.RCV_Manage_Customer;
                cmd.Parameters.AddWithValue("prm_clientId", mod.ClientId);
                cmd.Parameters.AddWithValue("prm_id", mod.Id);
                cmd.Parameters.AddWithValue("prm_paymentTermId", mod.PaymentTermId);
                cmd.Parameters.AddWithValue("prm_name", mod.Name);
                cmd.Parameters.AddWithValue("prm_email", mod.Email);
                cmd.Parameters.AddWithValue("prm_phone", mod.Phone);
                cmd.Parameters.AddWithValue("prm_address", mod.Address);
                cmd.Parameters.AddWithValue("prm_creditLimit", mod.CreditLimit);
                cmd.Parameters.AddWithValue("prm_createdOn", mod.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", mod.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", mod.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", mod.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", mod.IsActive);
                cmd.Parameters.AddWithValue("prm_dbOperation", mod.DBoperation.ToString());
                cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                cmd.Parameters.Clear();
                if (closeConnection)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        public List<CustomerDE> RCV_Search_Customer (string WhereClause, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            List<CustomerDE> cust = new List<CustomerDE>();
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                var parameters = new
                {
                    prm_WhereClause = WhereClause
                ,
               
                };
                cust = cmd.Connection.Query<CustomerDE>(SPNames.RCV_Search_Customer.ToString(), parameters, commandType: CommandType.StoredProcedure).ToList();
                return cust;
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

    }
    #endregion

}

