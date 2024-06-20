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
    public class FiscalYearDAL
    {
        #region DbOperations
        public bool ManageFiscalYear(FiscalYearDE _fy, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = "Manage_FiscalYear";
                cmd.Parameters.AddWithValue("prm_clientId", _fy.ClientId);
                cmd.Parameters.AddWithValue("prm_id", _fy.Id);
                cmd.Parameters.AddWithValue("prm_yearCode", _fy.YearCode);
                cmd.Parameters.AddWithValue("prm_yearDesc", _fy.YearDesc);
                cmd.Parameters.AddWithValue("prm_yearDateFrom", _fy.YearDateFrom);
                cmd.Parameters.AddWithValue("prm_yearDateTo", _fy.YearDateTo);
                cmd.Parameters.AddWithValue("prm_isActiveYear", _fy.IsActiveYear);
                cmd.Parameters.AddWithValue("prm_createdOn", _fy.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", _fy.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", _fy.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", _fy.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", _fy.IsActive);
                cmd.Parameters.AddWithValue("prm_dbOperation", _fy.DBoperation.ToString());
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
        public List<FiscalYearDE> SearchFiscalYear(string WhereClause, MySqlCommand cmd)
        {
            bool closeConnection = false;
            //WhereClause = string.Empty;
            List<FiscalYearDE> lec = new List<FiscalYearDE>();
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                lec = cmd.Connection.Query<FiscalYearDE>("call lms.Search_FiscalYear('" + WhereClause + "')").ToList();
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
