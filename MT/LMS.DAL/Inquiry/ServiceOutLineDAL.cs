using Dapper;
using MySql.Data.MySqlClient;
using System;

using LMS.Core.Entities.Inquiry;
using LMS.Core.Constants;
using LMS.Core.Enums;
using System.Drawing.Printing;
using System.Drawing;           
using System.Data;
using LMS.DAL.Inquiry;
 
namespace LMS.DAL.Inquiry
{
    public partial class InquiryDAL : IInqDAL
    {

        #region DbOperations

        public bool INQ_Manage_ServiceOutline (ServiceOutlineDE mod, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = SPNames.INQ_Manage_ServiceOutline;
                cmd.Parameters.AddWithValue("prm_Id", mod.Id);
                cmd.Parameters.AddWithValue("prm_serviceId", mod.ServiceId);
                cmd.Parameters.AddWithValue("prm_content", mod.Content);
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
        public List<ServiceOutlineDE> INQ_Search_ServiceOutline(string WhereClause, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            List<ServiceOutlineDE> cust = new List<ServiceOutlineDE>();
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                var Parameters = new
                {
                    prm_WhereClause = WhereClause
                ,

                };
                cust = cmd.Connection.Query<ServiceOutlineDE>(SPNames.INQ_Search_ServiceOutline.ToString(), Parameters, commandType: System.Data.CommandType.StoredProcedure).ToList();
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

