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
        public bool RCV_Manage_Receipt(ReceiptDE mod, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = SPNames.RCV_Manage_Receipt;
                cmd.Parameters.AddWithValue("prm_clientId", mod.ClientId);
                cmd.Parameters.AddWithValue("prm_Id", mod.Id);
                cmd.Parameters.AddWithValue("prm_customerId", mod.CustomerId);
                cmd.Parameters.AddWithValue("prm_date", mod.Date);
                cmd.Parameters.AddWithValue("prm_number", mod.Number);
                cmd.Parameters.AddWithValue("prm_amount", mod.Amount);
                cmd.Parameters.AddWithValue("prm_comments", mod.Comments);
                cmd.Parameters.AddWithValue("prm_nextPayDate", mod.NextPayDate);
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
        public List<ReceiptDE> RCV_Search_Receipt(string WhereClause, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            List<ReceiptDE> recpt = new List<ReceiptDE>();
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
                recpt = cmd.Connection.Query<ReceiptDE>(SPNames.RCV_Search_Receipt.ToString(), parameters, commandType: CommandType.StoredProcedure).ToList();
                return recpt;
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
