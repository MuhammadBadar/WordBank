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

        public bool ManageReceipt(ReceiptDE _rcpt, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = "Manage_Receipt";

                cmd.Parameters.AddWithValue("prm_Id", _rcpt.Id);
                cmd.Parameters.AddWithValue("prm_customerId", _rcpt.CustomerId);
                cmd.Parameters.AddWithValue("prm_date", _rcpt.Date);
                cmd.Parameters.AddWithValue("prm_number", _rcpt.Number);
                cmd.Parameters.AddWithValue("prm_amount", _rcpt.Amount);
                cmd.Parameters.AddWithValue("prm_comments", _rcpt.Comments);
                cmd.Parameters.AddWithValue("prm_nextPayDate", _rcpt.NextPayDate);
                cmd.Parameters.AddWithValue("prm_createdOn", _rcpt.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", _rcpt.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", _rcpt.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", _rcpt.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", _rcpt.IsActive);
                cmd.Parameters.AddWithValue("prm_dbOperation", _rcpt.DBoperation.ToString());
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
        public List<ReceiptDE> SearchReceipt(string WhereClause, MySqlCommand cmd)
        {
            bool closeConnection = false;

            List<ReceiptDE> lec = new List<ReceiptDE>();
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                lec = cmd.Connection.Query<ReceiptDE>("call lms.Search_Receipt('" + WhereClause + "')").ToList();
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
