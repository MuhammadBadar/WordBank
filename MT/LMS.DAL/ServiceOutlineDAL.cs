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
    public class ServiceOutlineDAL
    {
        #region DbOperations
        public bool ManageServiceOutline(ServiceOutlineDE _sev, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = "Manage_ServiceOutline";
               
                cmd.Parameters.AddWithValue("prm_Id", _sev.Id);
                cmd.Parameters.AddWithValue("prm_serviceId", _sev.ServiceId);
                cmd.Parameters.AddWithValue("prm_content", _sev.Content);
                cmd.Parameters.AddWithValue("prm_createdOn", _sev.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", _sev.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", _sev.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", _sev.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", _sev.IsActive);
                cmd.Parameters.AddWithValue("prm_dbOperation", _sev.DBoperation.ToString());
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
        public List<ServiceOutlineDE> SearchServiceOutline(string WhereClause, MySqlCommand cmd)
        {
            bool closeConnection = false;
            //WhereClause = string.Empty;
            List<ServiceOutlineDE> lec = new List<ServiceOutlineDE>();
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                lec = cmd.Connection.Query<ServiceOutlineDE>("call lms.Search_ServiceOutline('" + WhereClause + "')").ToList();
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
