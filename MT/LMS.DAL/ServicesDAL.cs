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
    public class ServicesDAL
    {
        #region DbOperations
        public bool ManageServices(ServicesDE _ser, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = "Manage_Services";
                cmd.Parameters.AddWithValue("prm_id", _ser.Id);
                cmd.Parameters.AddWithValue("prm_serName", _ser.SerName);
                cmd.Parameters.AddWithValue("prm_serTitle", _ser.SerTitle);
                cmd.Parameters.AddWithValue("prm_createdOn", _ser.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", _ser.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", _ser.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", _ser.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", _ser.IsActive);
                cmd.Parameters.AddWithValue("prm_dbOperation", _ser.DBoperation.ToString());
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
        public List<ServicesDE> SearchServices(string WhereClause, MySqlCommand cmd)
        {
            bool closeConnection = false;
            //WhereClause = string.Empty;
            List<ServicesDE> lec = new List<ServicesDE>();
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                lec = cmd.Connection.Query<ServicesDE>("call lms.Search_Services('" + WhereClause + "')").ToList();
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
