using Dapper;
using LMS.Core.Entities;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.DAL
{
    public class OpeningBalanceDetailDAL
    {
        #region DbOperations
        public bool ManageOpeningBalanceDetail(OpeningBalanceDetailDE openingBalance, MySqlCommand? cmd)
        {
            bool closeConnection = true;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = "ACC_Manage_OpeningBalanceDetail";
                cmd.Parameters.AddWithValue("prm_clientId", openingBalance.ClientId);
                cmd.Parameters.AddWithValue("prm_id", openingBalance.Id);
                cmd.Parameters.AddWithValue("prm_CoaCodeId", openingBalance.CoaCodeId);
                cmd.Parameters.AddWithValue("prm_YearCode", openingBalance.YearCode);
                cmd.Parameters.AddWithValue("prm_CoaDebitAmt", openingBalance.CoaDebitAmt);
                cmd.Parameters.AddWithValue("prm_CoaCreditAmt", openingBalance.CoaCreditAmt);
                cmd.Parameters.AddWithValue("prm_createdOn", openingBalance.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", openingBalance.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", openingBalance.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", openingBalance.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", openingBalance.IsActive);
                cmd.Parameters.AddWithValue("prm_dbOperation", openingBalance.DBoperation.ToString());
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
        public List<OpeningBalanceDetailDE> SearchOpeningBalanceDetail(string WhereClause, MySqlCommand cmd)
        {
            bool closeConnection = false;
            //WhereClause = string.Empty;
            List<OpeningBalanceDetailDE> openingBalance = new List<OpeningBalanceDetailDE>();
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                openingBalance = cmd.Connection.Query<OpeningBalanceDetailDE>("call lms.ACC_Search_OpeningBalanceDetail('" + WhereClause + "')").ToList();
                return openingBalance;
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
