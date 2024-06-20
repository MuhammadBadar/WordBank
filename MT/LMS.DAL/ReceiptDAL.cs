using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using LMS.Core.Entities;
using MySql.Data.MySqlClient;

namespace LMS.DAL
{
    public class ReceiptDAL
    {
        #region DbOperations
        public bool ManageReceipt(ReceiptDE _rec, MySqlCommand? cmd)
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
                cmd.Parameters.AddWithValue("prm_customerId", _rec.CustomerId);
                cmd.Parameters.AddWithValue("prm_Id", _rec.Id);
                cmd.Parameters.AddWithValue("prm_date", _rec.Date);
                cmd.Parameters.AddWithValue("prm_number", _rec.Number);
                cmd.Parameters.AddWithValue("prm_amount", _rec.Amount);
                cmd.Parameters.AddWithValue("prm_comments", _rec.Comments);
                cmd.Parameters.AddWithValue("prm_nextPayDate", _rec.NextPayDate);
                cmd.Parameters.AddWithValue("prm_createdOn", _rec.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", _rec.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", _rec.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", _rec.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", _rec.IsActive);
                cmd.Parameters.AddWithValue("prm_dbOperation", _rec.DBoperation.ToString());
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
            //WhereClause = string.Empty;
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
